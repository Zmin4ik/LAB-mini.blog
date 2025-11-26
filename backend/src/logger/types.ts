export enum LogMode {
    CONSOLE = "console",
    FILE = "file",
    BOTH = "both",
}

export enum COLORS {
    INFO = "\x1b[36m",
    ERROR = "\x1b[31m",
    SUCCESS = "\x1b[32m",
    RESET = "\x1b[0m",
}

export interface Logger {
    info(message: string): void;
    error(message: string): void;
    success(message: string): void;
}