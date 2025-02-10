import './Modal.css';

type ModalProps = {
	children: React.ReactNode;
	showModal: boolean;
	setShowModal: (showModal: boolean) => void;
	showOverlay?: boolean;
	closeOnOverlayClick?: boolean;
};

/**
 * @prop children: React.ReactNode
 * @prop showModal: boolean
 * @prop setShowModal: (showModal: boolean) => void
 * @prop showOverlay?: boolean
 * @prop closeOnOverlayClick?: boolean
 */

export default function Modal(props: ModalProps) {
	const { children, showModal, showOverlay = true, closeOnOverlayClick = true, setShowModal } = props;

	return (
		<>
			{showOverlay && (
				<div
					className={`modal-overlay ${showModal ? 'modal-overlay-open' : ''}`}
					onClick={() => {
						if (closeOnOverlayClick) setShowModal(false);
					}}
				/>
			)}
			<div className={`modal ${showModal ? 'modal-open' : ''}`}>{children}</div>
		</>
	);
}
