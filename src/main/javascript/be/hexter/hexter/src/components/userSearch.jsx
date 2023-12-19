import React, { useEffect } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";

const mapStateToProps = ({ state }) => ({
  csrfToken: state.csrfToken,
});

function UserSearch({ csrfToken }) {
  useEffect(() => {
    fetch("/api/user/match-user", {
      headers: {
        "CSRF-TOKEN": csrfToken,
        "Content-Type": "Application/json",
      },
      method: "POST",
      body: JSON.stringify({
        firstname: "atry",
        lastname: "",
      }),
    });
  }, []);
  return (
    <Form>
      <Form.Control />
      <Form.Control />
    </Form>
  );
}

export default connect()(UserSearch);
