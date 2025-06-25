import { MoreVertical } from "react-feather"

import CustomMenu from "./CustomMenu"

const RowOptions = ({ options = [] }) => {
  return (
    <CustomMenu
      trigger={<MoreVertical size={14} />}
      options={options}
      buttonProps={{
        sx: {
          width: "32px",
          height: "32px",
          outline: "none",
        },
      }}
      direction={{
        vertical: "bottom",
        horizontal: "right",
      }}
    />
  )
}

export default RowOptions
