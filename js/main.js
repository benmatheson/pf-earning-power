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
        <PfdBanner data={this.state} />
        <div className="pfdSizeContainer">
          <p className="pfdSize"> 💵 Smaller PFD </p>
          {/* <p className="pfdSize"> ⟷</p> */}
          <p className="pfdSize"> 💰💸 🔥Bigger PFD </p>
        </div>

        <AmountSlider handler={this.handleChange} />
        <TextSummary data={this.state} />
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

    for (var i = 1; i <= 10; i++) {
      // console.log(i)
      const yearMoney = {
        pfd: pfd,
        year: i,
        money: total_cost_of_pfds * (1 + annual_return) ** i, //the compounded spend total
        annual_earnings_lost: annual_earnings * (1 + annual_return) ** i, // the compouned  earnings. hm
      };

      lost_earnings_array.push(yearMoney);
    }

    console.log(lost_earnings_array)

// ###################
const width = window.innerWidth;

const scaleY = d3.scaleLinear()
scaleY.range([0,100]).domain([0, 11000000000])
// 9 639 041 650.718876
// console.log(scaleX(2000000000))



// #####################



    return (
      <div>
        <p>
          A PFD of{" "}
          <span className="highlight">${parseInt(pfd).toLocaleString()} </span>
          will requires spending{" "}
          <span className="highlight">
            ${total_cost_of_pfds.toLocaleString()}{" "}
          </span>
          from savings accounts like the Alaska Permanent Fund. <br /> <br />
          Due to the lost earning power of those assets, it will cost Alaskans{" "}
          <span className="highlight">
            ${annual_earnings.toLocaleString()}
          </span>{" "}
          in 2021.
          <br /> <br /> And because the assets in the Permanent Fund compound,
          this mo
        </p>


        <svg width= {width-30} height ="100">
        {lost_earnings_array.map(function(d,i){
            return (<rect className="rect" x={i*30} y={5} width={(width-160)/10} height ={scaleY(d.money)} ></rect>)


        })}

        </svg>

      </div>
    );
  }
} //end of text summary

ReactDOM.render(<App />, document.getElementById("app"));
