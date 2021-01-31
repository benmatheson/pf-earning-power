class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { pfd: 1000 };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    // console.log("changed")
    // console.log(e.target.value)

    this.setState({ pfd: e.target.value });
  }

  render() {
    return (
      <div className="container">


<TextSummary data={this.state} />

        <PfdBanner data={this.state} />
        <PfdBannerLabel  />
       

        <AmountSlider handler={this.handleChange} />

        <div className="pfdSizeContainer">
          <p className="pfdSize"> 💵 Smaller PFD </p>
          {/* <p className="pfdSize"> ⟷</p> */}
          <p className="pfdSize"> 💰💸 🔥Bigger PFD </p>
        </div>
      </div> //app div
    );
  } //end of rendr
} //end of app

class AmountSlider extends React.Component {
  handleChange(e) {
    // console.log("changed")
    // console.log(e.target.value)
    // this.setState({pfd: e.target.value})
  }
  render() {
    return (
      <input
        type="range"
        min="0"
        max="7000"
        //   value="10"
        defaultValue="1000"
        className="slider"
        id="amountSlider"
        onChange={this.props.handler}
      ></input>
    );
  }
} //end of Amoutn Slider

class PfdBanner extends React.Component {
  render() {
    return (
  
      <div className="ban">
        ${parseInt(this.props.data.pfd).toLocaleString()}
      </div>
          
  
    );
  }
}



class PfdBannerLabel extends React.Component {
    render() {
      return (
    
        <div className="lan">
        PFD Size
        </div>
            
    
      );
    }
  }
  






class TextSummary extends React.Component {
  // componentDidMount () {

  //     console.log("RENDINGRS TEXd")
  //     const pfd = (this.props.data.pfd).toLocaleString()
  //     const total_cost_of_pfds = pfd * 700000
  //     const annual_return = .07
  //     const annual_return_full = 1.07

  //     const annual_earnings = Math.floor(total_cost_of_pfds* annual_return)

  //     // console.log(total_cost_of_pfds*(1+annual_return)^3)

  // const lost_earnings_array = []

  // for(var i=1; i<=10; i++) {
  //     // console.log(i)
  //     const yearMoney =  {
  //         "pfd": pfd,
  //         "year": i,
  //         "money": total_cost_of_pfds  *((1+annual_return)**i)

  //     }

  //     lost_earnings_array.push(yearMoney)

  // }
  // console.log(lost_earnings_array)

  // }

  render() {
    // console.log("RENDINGRS TEXd")
    const pfd = this.props.data.pfd;
    const total_cost_of_pfds = pfd * 700000;
    // console.log(total_cost_of_pfds)
    const annual_return = 0.07;
    const annual_return_full = 1.07;

    const annual_earnings = Math.floor(total_cost_of_pfds * annual_return);

    // console.log(total_cost_of_pfds*(1+annual_return)^3)









    const lost_earnings_array = [];

    for (var i = 1; i <= 20; i++) {
      // console.log(i)
      const yearMoney = {
        pfd: pfd,
        year: i,
        money: total_cost_of_pfds * (1 + annual_return) ** i, //the compounded spend total
        annual_earnings_lost: annual_earnings * (1 + annual_return) ** (i-1), // the compouned  earnings. hm
      };

      lost_earnings_array.push(yearMoney);
    }

    console.log(lost_earnings_array)


const total_lost_earnings = Math.floor(lost_earnings_array.reduce(( total, curr)=>total+=curr.annual_earnings_lost,0))


console.log(total_lost_earnings)




// #########FoRMATTING


var total_cost_of_pfds_format;

total_cost_of_pfds <1000000000 ? total_cost_of_pfds_format = `$${Math.floor(total_cost_of_pfds/1000000)} million` : total_cost_of_pfds_format = `$${(total_cost_of_pfds/1000000000).toFixed(2)} billion`
 console.log(total_cost_of_pfds_format)


 var annual_earnings_format;
 annual_earnings <1000000000 ? annual_earnings_format = `$${Math.floor(annual_earnings/1000000)} million` : annual_earnings_format = `$${(annual_earnings/1000000000).toFixed(2)} billion`

 var total_lost_earnings_format;

 total_lost_earnings <1000000000 ? total_lost_earnings_format = `$${Math.floor(total_lost_earnings/1000000)} million` : total_lost_earnings_format = `$${(total_lost_earnings/1000000000).toFixed(2)} billion`




// #########FoRMATTING



// ###################


const width = window.innerWidth;



var spacing; // this is the i * spacing
var barWidth;

width >=767 ? spacing = (width *.55)/20 : spacing  =  (width - 30) /20
width >=767 ? barWidth = (width *.4)/20 : barWidth  =  (width - 50) /20

const scaleY = d3.scaleLinear()
scaleY.range([0,85]).domain([0, 1400000000])
// 9 639 041 650.718876
// console.log(scaleX(2000000000))



// #####################



    return (
      <div>
        <p className ="TextSummary">
          An Alaska PFD of{" "}
          <span className="highlight green">${parseInt(pfd).toLocaleString()} </span>
          requires spending{" "}
          <span className="highlight red">
            {/* ${total_cost_of_pfds.toLocaleString()}{" "} */}
            {total_cost_of_pfds_format}{" "}
          </span>
          from savings accounts like the Alaska Permanent Fund. <br /> <br />
          Due to the lost earning power of those assets, that costs Alaskans{" "}
          <span className="highlight red">
            {annual_earnings_format}
          </span>{" "}
          in missed growth in 2021. Compounded over 20 years, this would cost           <span className="highlight red">
{total_lost_earnings_format}</span>
        </p>


        <svg width= {width-30} height ="90">
        {lost_earnings_array.map(function(d,i){
            return (<rect className="rect" x={i*spacing} y={5} width={barWidth} height ={scaleY(d.annual_earnings_lost)} ></rect>)


        })}

        </svg>

      </div>
    );
  }
} //end of text summary

ReactDOM.render(<App />, document.getElementById("app"));
