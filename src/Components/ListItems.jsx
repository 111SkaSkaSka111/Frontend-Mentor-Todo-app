const ListItems = ({ item, handleDelete, handleCheck }) => {
    return (
        <li>
            <label>
                <div className="input-check">
                    <input type="checkbox" className="check" onChange={() => handleCheck(item.id)} checked={item.checked} />
                    <div className="checkbox-custom"></div>
                </div>
                <p className="text" title={item.text}>
                    {item.text}
                </p>
            </label>
            <div onClick={() => handleDelete(item.id)} className="">
                <img src="/Frontend-Mentor-Todo-app/images/icon-cross.svg" alt="" />
            </div>
        </li>
    );
};

export default ListItems;
