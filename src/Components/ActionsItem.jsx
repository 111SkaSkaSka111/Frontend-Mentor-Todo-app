import React from "react";

const ActionsItem = ({ filter, list, handleClearCompleted, handleShowAll, handleShowActive, handleShowCompleted }) => {
    return (
        <div className="actions">
            <p className="active">{list.length} items left</p>
            <div className="buttons">
                <p className={`${filter === "All" ? "active" : ""}`} onClick={handleShowAll}>
                    All
                </p>
                <p className={`${filter === "Active" ? "active" : ""}`} onClick={handleShowActive}>
                    Active
                </p>
                <p className={`${filter === "Completed" ? "active" : ""}`} onClick={handleShowCompleted}>
                    Completed
                </p>
            </div>
            <p className="clear" onClick={handleClearCompleted}>
                Clear Completed
            </p>
        </div>
    );
};

export default ActionsItem;
