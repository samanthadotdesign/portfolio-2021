import { LayoutModeToggle } from './styles';

export default function Mode(props) {
	const { isMessy } = props;

	return (
		<LayoutModeToggle>
			{isMessy ? 'Back to Chaos' : 'Back to Neat'}
		</LayoutModeToggle>
	);
}