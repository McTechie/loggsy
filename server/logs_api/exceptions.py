class LogException(Exception):
    """Base exception for logs API."""

    pass


class LogDataInvalid(LogException):
    def __init__(self, err) -> None:
        self.err = err

        if "timestamp" in self.err:
            super().__init__(f"Invalid timestamp: {self.err['timestamp'][0]}")

        if "severity" in self.err:
            super().__init__(f"Invalid severity: {self.err['severity'][0]}")

        if "source" in self.err:
            super().__init__(f"Invalid source: {self.err['source'][0]}")

        if "message" in self.err:
            super().__init__(f"Invalid message: {self.err['message'][0]}")


class LogDoesNotExist(LogException):
    def __init__(self, id) -> None:
        super().__init__(f"Log with id {id} does not exist")


class LogAlreadyExists(LogException):
    def __init__(self, id) -> None:
        super().__init__(f"Log with id {id} already exists")
