import {Component} from 'react'

import './index.css'

class HomeRoute extends Component {
  state = {listItems: [], imageList: []}

  componentDidMount() {
    const {initialCountriesList} = this.props
    const visitedList = initialCountriesList.filter(
      eachItem => eachItem.isVisited === true,
    )
    this.setState({
      listItems: initialCountriesList,
      imageList: visitedList,
    })
  }

  onClickEvent = item => {
    this.setState(prevState => ({
      listItems: prevState.listItems.map(eachItem => {
        if (eachItem.id === item.id) {
          return {
            ...eachItem,
            isVisited: !eachItem.isVisited,
            isClicked: !eachItem.isClicked,
          }
        }
        return eachItem
      }),
      imageList: [...prevState.imageList, item],
    }))
  }

  onRemoveEvent = item => {
    this.setState(prevState => ({
      listItems: prevState.listItems.map(eachItem => {
        if (eachItem.id === item.id) {
          return {
            ...eachItem,
            isVisited: !eachItem.isVisited,
            isClicked: !eachItem.isClicked,
          }
        }
        return eachItem
      }),
      imageList: prevState.imageList.filter(
        eachItem => eachItem.id !== item.id,
      ),
    }))
  }

  render() {
    const {listItems, imageList} = this.state

    return (
      <div className="Background-container">
        <h1 className="Head">Countries</h1>
        <ul className="List-container">
          {listItems.map(eachItem => (
            <li className="List-items" key={eachItem.id}>
              <p className="List-para">{eachItem.name}</p>
              {eachItem.isVisited ? (
                <p className="Visited-para">Visited</p>
              ) : (
                <button
                  type="button"
                  className="Visit-button"
                  onClick={
                    eachItem.isClicked
                      ? () => {}
                      : () => this.onClickEvent(eachItem)
                  }
                >
                  Visit
                </button>
              )}
            </li>
          ))}
        </ul>
        <h1 className="Head">Visited Countries</h1>
        {imageList.length !== 0 && (
          <ul className="Visited-container">
            {imageList.map(eachItem => (
              <li className="Visited-items" key={eachItem.id}>
                <img
                  src={eachItem.imageUrl}
                  alt="thumbnail"
                  className="Image"
                />
                <div className="Text-container">
                  <p className="Bottom-para">{eachItem.name}</p>
                  <button
                    type="button"
                    className="Remove-button"
                    onClick={() => this.onRemoveEvent(eachItem)}
                  >
                    <p>Remove</p>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {imageList.length === 0 && (
          <ul className="Novisited-container">
            <p className="Novisited-para">No Countries Visited Yet</p>
          </ul>
        )}
      </div>
    )
  }
}

export default HomeRoute
