export default function DeleteButton({ onClick, children = "Deletar" }) {
    return (
        <button onClick={onClick} style={{ marginLeft: '10px' }}>
            {children}
        </button>
    );
}