import '../App.css';

function Page1() {
    return (
        <div className="App">
            <header className="App-header">
                <a href='/auth/login'>login</a>
                <a href='/auth/register'>register</a>
                <a href='/account'>my account</a>
            </header>
        </div>
    );
}

export default Page1;
