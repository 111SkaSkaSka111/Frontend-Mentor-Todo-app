import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ListItem = ({ item, handleDelete, handleCheck }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <label>
                <div className="input-check">
                    <input type="checkbox" className="check" checked={item.checked} onChange={() => handleCheck(item.id)} />
                    <div className="checkbox-custom"></div>
                </div>
                <p className="text">{item.text}</p>
            </label>
            <div onClick={() => handleDelete(item.id)} className="">
                <img src="/images/icon-cross.svg" alt="" />
            </div>
        </li>
    );
};

export default ListItem;

{
    /*          App.jsx

    <div className="todos">
                    <ul>
                        {filteredTodoList.length > 0 ? (
                            <DndContext onDragEnd={handleDragEnd}>
                                <SortableContext items={filteredTodoList}>
                                    {filteredTodoList.map((item) => (
                                        <ListItem key={item.id} item={item} handleDelete={handleDelete} handleCheck={handleCheck} />
                                    ))}
                                </SortableContext>
                            </DndContext>
                        ) : (
                            <p className="empty">Your list is empty</p>
                        )}
                    </ul>

                    <ActionsItem list={todoList} handleClearCompleted={handleClearCompleted} handleShowAll={handleShowAll} handleShowActive={handleShowActive} handleShowCompleted={handleShowCompleted} />
                </div> */
}
