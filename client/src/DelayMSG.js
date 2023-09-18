function DelayMSG() {
  return (
    <div className="overlay">
      <div className="confirm-box">
        <p style={{ color: "red", fontSize: "30px" }}>
          If this is your first interaction with the contact management app or
          interaction after 15 minutes of inactivity there might be a delay of
          upto 2 minutes for my free server to start up. I appreciate your
          patience.
        </p>
      </div>
    </div>
  );
}

export default DelayMSG;
