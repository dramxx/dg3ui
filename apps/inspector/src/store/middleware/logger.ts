import { createLogger } from 'redux-logger'

const logger = createLogger({
	logger: console,
	level: 'log',
	duration: true,
	timestamp: true,
	logErrors: true,
	collapsed: true,
	colors: {
		title: () => '#262626',
		prevState: () => 'SteelBlue',
		action: () => 'DarkViolet',
		nextState: () => 'Green',
		error: () => 'Crimson',
	},
})

export default logger
