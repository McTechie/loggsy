import datetime


def getLogsByNumOfDays(logs, num_of_days):
    result = []

    for severity in range(1, 7):
        result.append(
            {
                "severity": severity,
                "count": logs.filter(
                    severity=severity,
                    timestamp__gte=datetime.datetime.now()
                    - datetime.timedelta(days=num_of_days),
                ).count(),
            }
        )

    return result


def getOverviewData(logs):
    overview_data = []

    # part 1.1: logs created in the last 24 hours
    dailyData = getLogsByNumOfDays(logs, 1)

    # filter data to remove logs with count of 0
    dailyData = list(filter(lambda x: x["count"] != 0, dailyData))

    overview_data.append({"type": "daily", "data": dailyData})

    # part 1.2: logs created in the last 7 days
    weeklyData = getLogsByNumOfDays(logs, 7)

    # filter data to remove logs with count of 0
    weeklyData = list(filter(lambda x: x["count"] != 0, weeklyData))

    overview_data.append({"type": "monthly", "data": weeklyData})

    # part 1.3: logs created in the last 30 days
    monthlyData = getLogsByNumOfDays(logs, 30)

    # filter data to remove logs with count of 0
    monthlyData = list(filter(lambda x: x["count"] != 0, monthlyData))

    overview_data.append({"type": "weekly", "data": monthlyData})

    return overview_data


def getAnnualData(logs):
    annual_data = []

    for log in logs:
        logData = {}

        logData["date"] = log.timestamp.date()
        logData["count"] = logs.filter(timestamp__date=log.timestamp.date()).count()

        if logData not in annual_data:
            annual_data.append(logData)

    return annual_data


def getSeverityData(logs):
    severity_data = []

    for log in logs:
        logData = {}

        logData["severity"] = log.severity
        logData["count"] = logs.filter(severity=log.severity).count()

        if logData not in severity_data:
            severity_data.append(logData)

    return severity_data
