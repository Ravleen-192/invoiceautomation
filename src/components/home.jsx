import React,{Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import homeimg from "../images/home.png";
/*const divStyle = {
  backgroundposition: "50% 0",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100%',
  opacity:1,
  //backgroundImage: `url(${homeimg})`,
};*/
class Home extends Component {
  constructor() {
    super();
    this.state = { 
      activeIndex :0,isActivePre:false,
      
    };
  }
  componentDidMount(){
    window.scrollTo(0,0);
    
  }
  handleClick = event => {
    this.props.switchComponent("SignIn");
    this.props.setOnLoad(true);
    this.props.clearInputs();
  }
  render() {
    
    return (
      <section>
      <div className="bg ">
        
          
            <div className="centerdiv">
              <h2 align="center">At CompNova our mission is to build productive partnerships with clients.</h2>
              <h3 align="center" > Help them achieve greater success by providing the best in knowledge, skills, solutions and services.</h3>
              <h6 align="center">Our focus is on providing value-based solutions for our clients that deliver exceptional customer experience, and to do so in a cost effective way.</h6>
              <button align="center" className="frmbtn" onClick={this.handleClick}>Sign in </button>
            </div>
          
        
      </div>
      </section>
    );
  }
}

export default Home;