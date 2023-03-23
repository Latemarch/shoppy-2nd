export default function Button({
	text,
	onClick,
}: {
	text: string;
	onClick(): any;
}) {
	return (
		<div
			className="bg-brand rounded p-2 hover:brightness-110 cursor-pointer"
			onClick={onClick}
		>
			{text}
		</div>
	);
}
