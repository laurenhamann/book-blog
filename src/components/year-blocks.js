import React from "react"
import { Link } from "gatsby"

export const Years = () => {
  return (
    <div>
      <u>Review by Year</u>
      <br />
      <Link to="/years/2021" state={{ year: 2021 }}>
        2021
      </Link>
      <br />
      <Link to="/years/2022" state={{ year: 2022 }}>
        2022
      </Link>
      <br />
      <Link to="/years/2023" state={{ year: 2023 }}>
        2023
      </Link>
      <br />
    </div>
  )
}
