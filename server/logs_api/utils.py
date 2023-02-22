import datetime

def getLogsByNumOfDays(logs, num_of_days):
    result = []

    for severity in range(1, 7):
        result.append({
            'severity': severity,
            'count': logs.filter(
                severity=severity,
                timestamp__gte=datetime.datetime.now() - datetime.timedelta(days=num_of_days)
            ).count()
        })
    
    return result


def getOverviewData(logs):
    overview_data = []

    # part 1.1: logs created in the last 24 hours
    dailyData = getLogsByNumOfDays(logs, 1)
    
    overview_data.append({
        'type': 'daily',
        'data': dailyData
    })

    # part 1.2: logs created in the last 7 days
    monthlyData = getLogsByNumOfDays(logs, 7)

    overview_data.append({
        'type': 'monthly',
        'data': monthlyData
    })

    # part 1.3: logs created in the last 30 days
    yearlyData = getLogsByNumOfDays(logs, 30)

    overview_data.append({
        'type': 'yearly',
        'data': yearlyData
    })

    return overview_data


def getAnnualData(logs):
    annual_data = {}

    # part 2.1: all sources available in the DB
    annual_data['sources'] = list(set(logs.values_list('source', flat=True)))

    # part 2.2: count and date of all logs in the DB
    annual_data['data'] = []

    for log in logs:
        logData = []

        logData.append({
            'date': log.timestamp.date(),
            'count': logs.filter(timestamp__date=log.timestamp.date()).count()
        })

        if logData not in annual_data['data']:
            annual_data['data'].append(logData)
        
    return annual_data


def getSeverityData(logs):
    severity_data = []

    for log in logs:
        logData = {}

        logData['severity'] = log.severity
        logData['count'] = logs.filter(severity=log.severity).count()
        
        if logData not in severity_data:
            severity_data.append(logData)

    return severity_data
