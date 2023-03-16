import React from "react"

const colors = ["#8FE3CF", "#2B4865", "#256D85", "#8e9aaf", "#5aa9e6"]

export const PieChart = ({ array, booksRead, title }) => {
  // Take how many are in array and divid by books read that month.
  let degrees = []
  const pieArray = array.map((section, index) => {
    if (array.length > 1) {
      const math = section.count / booksRead
      const percentage = Math.round(math * 360)
      degrees.push(percentage)
      return (
        <div className="key">
          <div
            className="square"
            style={{ "background-color": colors[index] }}
          ></div>
          <p>
            <span>{section.name}</span> - <span>{section.count}</span>
          </p>
        </div>
      )
    } else {
      degrees.push(360)
      return (
        <div className="key">
          <div
            className="square"
            style={{ "background-color": colors[index] }}
          ></div>
          <p>
            <span>{section.name}</span> - <span>{section.count}</span>
          </p>
        </div>
      )
    }
  })

  const length = degrees.length

  if (length == 2) {
    const gradient = `conic-gradient(${colors[0]} 0deg, ${colors[0]} ${degrees[0]}deg, ${colors[1]} ${degrees[0]}deg, ${colors[1]} 270deg )`
    return (
      <section className="chart-section">
        <h3>{title}</h3>
        <div className="pie-chart-container">
          <div
            className="pie-chart"
            style={{
              "background-image": gradient,
            }}
          ></div>
          <div className="key-chart">{pieArray}</div>
        </div>
      </section>
    )
  } else if (length == 1) {
    return (
      <section className="chart-section">
        <h3>{title}</h3>
        <div className="pie-chart-container">
          <div
            className="pie-chart"
            style={{
              "background-color": colors[0],
            }}
          ></div>
          <div className="key-chart">{pieArray}</div>
        </div>
      </section>
    )
  } else if (length == 3) {
    const gradient = `conic-gradient(${colors[0]} 0deg, ${colors[0]} ${degrees[0]}deg, ${colors[1]} ${degrees[0]}deg, ${colors[1]} 270deg )`
    return (
      <section className="chart-section">
        <h3>{title}</h3>
        <div className="pie-chart-container">
          <div
            className="pie-chart"
            style={{
              "background-image": gradient,
            }}
          ></div>
          <div className="key-chart">{pieArray}</div>
        </div>
      </section>
    )
  }
}
