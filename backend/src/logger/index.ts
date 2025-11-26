// backend/src/logger/index.ts
import * as fs from "fs";
import path from "path";
import { Logger, LogMode, COLORS } from "./types";

const LOG_DIR = path.resolve(process.cwd(), "src", "db", "logs"); // logs inside src/db для простого доступу
const LOG_FILE = path.join(LOG_DIR, "logs.log");

function getTimestamp(): string {
    return new Date().toISOString();
}

/**
 * Парсить process.argv і повертає LogMode.
 * Підтримує форми:
 *  --log-to=console  або  --log-to-console
 * Якщо прапора нема або значення невідоме — повертає LogMode.CONSOLE
 */
export function getLogMode(): LogMode {
    const args = process.argv.slice(2);
    const arg = args.find(a => a.startsWith("--log-to"));
    if (!arg) return LogMode.CONSOLE;

    let value = "";
    if (arg.includes("=")) {
        value = arg.split("=")[1] ?? "";
    } else {
        const parts = arg.split("--log-to-");
        value = parts[1] ?? "";
    }

    value = value.toLowerCase().replace(/^["']|["']$/g, "");

    if (Object.values(LogMode).includes(value as LogMode)) {
        return value as LogMode;
    }

    return LogMode.CONSOLE;
}

export function createLogger(mode: LogMode): Logger {
    class ConsoleLogger implements Logger {
        private format(typeLabel: string, message: string): string {
            return `${typeLabel}: [${getTimestamp()}] - ${message}`;
        }
        info(message: string): void {
            console.log(`${COLORS.INFO}${this.format("[INFO]", message)}${COLORS.RESET}`);
        }
        error(message: string): void {
            console.error(`${COLORS.ERROR}${this.format("[ERROR]", message)}${COLORS.RESET}`);
        }
        success(message: string): void {
            console.log(`${COLORS.SUCCESS}${this.format("[SUCCESS]", message)}${COLORS.RESET}`);
        }
    }

    class FileLogger implements Logger {
        constructor() {
            try {
                if (!fs.existsSync(LOG_DIR)) {
                    fs.mkdirSync(LOG_DIR, { recursive: true });
                }
            } catch (e) {
                // fallback: виводимо в консоль, якщо не можемо створити теку
                // eslint-disable-next-line no-console
                console.error("Logger init: cannot create log directory:", e);
            }
        }

        private writeToFile(line: string): void {
            const fileMessage = `${line}\n`;
            fs.appendFile(LOG_FILE, fileMessage, "utf8", (err) => {
                if (err) {
                    // якщо не вдалося записати — fallback в консоль
                    // eslint-disable-next-line no-console
                    console.error("Failed to write log to file:", err);
                }
            });
        }

        private format(typeLabel: string, message: string): string {
            return `${typeLabel}: [${getTimestamp()}] - ${message}`;
        }

        info(message: string): void {
            this.writeToFile(this.format("[INFO]", message));
        }
        error(message: string): void {
            this.writeToFile(this.format("[ERROR]", message));
        }
        success(message: string): void {
            this.writeToFile(this.format("[SUCCESS]", message));
        }
    }

    class BothLogger implements Logger {
        private console = new ConsoleLogger();
        private file = new FileLogger();

        info(message: string): void {
            this.console.info(message);
            this.file.info(message);
        }
        error(message: string): void {
            this.console.error(message);
            this.file.error(message);
        }
        success(message: string): void {
            this.console.success(message);
            this.file.success(message);
        }
    }

    switch (mode) {
        case LogMode.FILE:
            return new FileLogger();
        case LogMode.BOTH:
            return new BothLogger();
        case LogMode.CONSOLE:
        default:
            return new ConsoleLogger();
    }
}

// singleton logger
export const logger: Logger = createLogger(getLogMode());