// type imports
import { FC } from 'react'

interface SeverityBadgeProps {
  severity: number
}

const SeverityBadge: FC<SeverityBadgeProps> = ({ severity }) => {
  const getSeverityAndColor = (severity: number) => {
    switch (severity) {
      case 1:
        return { type: 'TRACE', color: 'bg-gray-300' }
      case 2:
        return { type: 'DEBUG', color: 'bg-gray-400 text-white' }
      case 3:
        return { type: 'INFO', color: 'bg-green-300' }
      case 4:
        return { type: 'WARN', color: 'bg-yellow-300' }
      case 5:
        return { type: 'ERROR', color: 'bg-red-300' }
      case 6:
        return { type: 'FATAL', color: 'bg-rose-400 text-white' }
      default:
        return { type: 'TRACE', color: 'bg-gray-300' }
    }
  }

  const { type, color } = getSeverityAndColor(severity)

  return (
    <span className={`text-xs px-2 py-1 rounded-full text-gray-700 ${color}`}>
      {type}
    </span>
  )
}

export default SeverityBadge
