import logo from "./assets/logo.svg";

function App() {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "var(--background)"
            }}
        >
            <img
                src={logo}
                alt="Contri"
                style={{
                    width: "420px"
                }}
            />
        </div>
    );
}

export default App;