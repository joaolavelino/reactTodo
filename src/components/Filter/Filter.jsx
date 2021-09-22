import React, { useEffect } from "react";
import "./style.css";

function Filter(props) {

  useEffect(() => {
    filterByCategory().then(data=>filterByStatus(data));
  }, [props.categoryFilter, props.status, props.todos]);


  const statusHandler = (event) => {
    props.setStatus(event.target.value);
  };

  const statusHandler2 = (event) => {
    props.setCategoryFilter(event.target.value);
  };

  const filterByCategory =  async () => {
    const currentCategory = props.categoryFilter;
    if (currentCategory === "all") {
      // await props.setFilteredTodosCategory(props.todos);
      const filter1 = await props.todos
      return filter1
    } else {
      const filteredByCategory = await props.todos.filter(
        (el) => el.category === currentCategory
      );
      //  await props.setFilteredTodosCategory(filteredByCategory);
      return filteredByCategory
    }
  };

  const filterByStatus = async (arrayByCategory) => {
    const currentStatus = props.status;
    if (currentStatus === "all") {
      props.setFilteredTodos(arrayByCategory);
    } else {
      if(currentStatus==="isCompleted"){
        const filteredByStatus = arrayByCategory.filter(
          (el) => el.isCompleted === true
        );
        // const filteredByStatus = props.filteredTodosCategory.filter(
        //   (el) => el.isCompleted === true
        // );
        props.setFilteredTodos(filteredByStatus);
      }else if(currentStatus==="isPrioritary"){
        const filteredByStatus = arrayByCategory.filter(
          (el) => el.isPrioritary === true
        );
        // const filteredByStatus = props.filteredTodosCategory.filter(
        //   (el) => el.isPrioritary === true
        // );
        props.setFilteredTodos(filteredByStatus);
      }else if(currentStatus==="isLate"){
        const filteredByStatus = arrayByCategory.filter(
          (el) => el.isLate === true
        );
        // const filteredByStatus = props.filteredTodosCategory.filter(
        //   (el) => el.isLate === true
        // );
        props.setFilteredTodos(filteredByStatus);
      }
      
    }
  };

  return (
    <section className="filter">
      <div className="filter-header">
        <h2 className="filter-title">Filter</h2>
        <h2 className="filter-title filter-title-class">Class Filter</h2>
      </div>

      <div className="filter-body">
        <button className="filter-all" value="all" onClick={statusHandler}>
          ALL
        </button>

        <button
          className="filter-check"
          value="isCompleted"
          name="completed"
          onClick={statusHandler}
        >
          <i className="fas fa-check-square"></i>
        </button>

        <button
          className="filter-important"
          value="isPrioritary"
          name="prioritary"
          onClick={statusHandler}
        >
          <i className="fas fa-exclamation-triangle"></i>
        </button>

        <button
          className="filter-late"
          value="isLate"
          name="late"
          onClick={statusHandler}
        >
          <i className="fas fa-clock"></i>
        </button>

        <select className="filter-select" onClick={statusHandler2}>
          <option value="all">ALL</option>
          <option value="">Uncategorized</option>
          {props.categories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}

export default Filter;
