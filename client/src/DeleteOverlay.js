function DeleteOverlay(props) {
  return (
    <div className="overlay">
      <div className="confirm-box">
        <p>Are you sure you want to delete?</p>
        <button onClick={props.handleConfirmDelete}>Yes</button>
        <button onClick={props.handleCancelDelete}>No</button>
      </div>
    </div>
  );
}

export default DeleteOverlay;
