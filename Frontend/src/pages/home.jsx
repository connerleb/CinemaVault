import logo from "../assets/logo.png";

function Home() {
    console.log("home rendered");
    return (
        <div>
            <img src={logo} alt="Cinema Vault Logo" />
            <p>Welcome to the home of all of your movie and tv show reviews all in one place!</p>
        </div>
    );
}
export default Home;