import { useEffect, useState } from "react";
import ListItem from "./Components/ListItem";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import ActionsItem from "./Components/ActionsItem";
import ListItems from "./Components/ListItems";

function App() {
    const [todoList, setTodoList] = useState([]);
    const [filteredTodoList, setFilteredTodoList] = useState([]);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        setTodoList(JSON.parse(localStorage.getItem("todoList")));
    }, []);

    useEffect(() => {
        saveToLocalStorage();
        applyFilter();
    }, [todoList, filter]);

    const saveToLocalStorage = () => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    };

    const getCurrentDateTime = () => {
        const now = new Date();

        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0"); // Januari adalah 0
        const year = now.getFullYear();

        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };

    const handleInputText = (event) => {
        if (event.key === "Enter") {
            const value = event.target.value;
            const newId = todoList.length + 1;

            const currentTime = getCurrentDateTime();

            setTodoList((prev) => {
                return [{ id: newId, text: value, time: currentTime, checked: false }, ...prev];
            });

            event.target.value = "";
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setTodoList((prev) => {
                const activeIndex = prev.findIndex((item) => item.id === active.id);
                const overIndex = prev.findIndex((item) => item.id === over.id);
                const newList = [...prev];

                newList.splice(overIndex, 0, newList.splice(activeIndex, 1)[0]);
                return newList;
            });
        }
    };

    const handleDelete = (id) => {
        setTodoList((prev) => {
            return prev.filter((item) => item.id !== id);
        });

        console.log(id);
    };

    const handleCheckAll = (event) => {
        const checked = event.target.checked;
        const checkboxes = document.querySelectorAll(".todos input[type='checkbox']");
        checkboxes.forEach((checkbox) => {
            checkbox.checked = checked;
        });

        setTodoList((prev) => {
            return prev.map((item) => {
                return { ...item, checked };
            });
        });
    };

    const handleClearCompleted = () => {
        setTodoList((prev) => {
            return prev.filter((item) => !item.checked);
        });
    };

    const handleShowAll = () => {
        setFilter("All");
    };

    const handleShowActive = () => {
        setFilter("Active");
    };

    const handleShowCompleted = () => {
        setFilter("Completed");
    };

    const handleCheck = (id) => {
        setTodoList((prev) => {
            return prev.map((item) => {
                if (item.id === id) {
                    return { ...item, checked: !item.checked };
                } else {
                    return item;
                }
            });
        });
    };

    const applyFilter = () => {
        if (filter === "All") {
            setFilteredTodoList(todoList);
        } else if (filter === "Active") {
            setFilteredTodoList(todoList.filter((item) => !item.checked));
        } else if (filter === "Completed") {
            setFilteredTodoList(todoList.filter((item) => item.checked));
        }
    };

    const handleApperence = () => {
        const main = document.querySelector("main");

        main.classList.toggle("dark");
    };

    return (
        <main className="dark">
            <div className="background"></div>
            <div className="wrapper">
                <header>
                    <h1>TODO</h1>
                    <div className="logo-apperence" onClick={handleApperence}></div>
                </header>
                <div className="input">
                    <label>
                        <div className="input-check">
                            <input type="checkbox" name="" id="check" className="check" onChange={handleCheckAll} />
                            <div className="checkbox-custom"></div>
                        </div>
                    </label>

                    <input type="text" placeholder="Create a new todo..." className="input-text" onKeyUp={handleInputText} />
                </div>
                <div className="todos">
                    <ul>
                        {filteredTodoList.length > 0 ? (
                            <>
                                {filteredTodoList.map((item) => (
                                    <ListItems key={item.id} item={item} handleDelete={handleDelete} handleCheck={handleCheck} />
                                ))}
                            </>
                        ) : (
                            <p className="empty">Your list is empty</p>
                        )}
                    </ul>

                    <ActionsItem list={todoList} filter={filter} handleClearCompleted={handleClearCompleted} handleShowAll={handleShowAll} handleShowActive={handleShowActive} handleShowCompleted={handleShowCompleted} />
                </div>

                {/* <p className="drag">Drag and drop to reorder list</p> */}
            </div>
        </main>
    );
}

export default App;
