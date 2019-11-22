import Nav from './nav';
import Header from "./head";

const Layout = (props) => (
    <div>
        <Header title={props.title}/>
        <Nav/>
        <br/>
        <div className="container">{props.children}</div>
    </div>
);

export default Layout;