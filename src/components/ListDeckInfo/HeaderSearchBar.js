import React from "react";
import {Input, Select} from "antd";
import styles from "./HeaderSearchBar.module.css";

const Search = Input.Search;
const Option = Select.Option;

export default function HeaderSearchBar({page}) {
  return (
    <div className={styles.searchContainer}>
      {/* <div> */}
      <h1 className={styles.heading} data-testid="page">
        {page}
      </h1>
      {/* </div> */}
      <div className={styles.filters}>
        <Search
          placeholder="Search"
          onSearch={value => console.log(value)}
          style={{width: "20vw"}}
        />
        <div>
          Sort By:
          <Select defaultValue="Home">
            <Option value="Home">Option 1</Option>
            <Option value="Company">Option2</Option>
          </Select>
        </div>
      </div>
    </div>
  );
}