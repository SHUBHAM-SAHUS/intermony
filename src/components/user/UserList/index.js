import React, { useState, useEffect } from "react";
import * as UserAction from "redux/actions/UserActions";
import UserTable from "./UserList.js";
import { useDispatch, useSelector } from "react-redux";
import * as ConfigAction from "redux/actions/ConfigActions";
import Form from "../UserComponent/Form";
import Filter from "./Filter";

import * as commonService from "utils/CommonService";

const UserList = () => {
  const defaultPagination = {
    page: 1,
    limit: 10,
    orderBy: "DESC"

  };
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const { userList, count } = useSelector((state) => state.userReducer);
  const [currentUser, setCurrentUser] = useState(null);
  const [ pagination, setDefaultPagination ] = useState(defaultPagination);
  const [filterParams, setFilterParams] = useState({});

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      dispatch(ConfigAction.getConfigList());
      dispatch(UserAction.getUserList({...pagination}))
    }
    return () => {
      return true;
    };
  },[loaded, dispatch, pagination]);

  const handleFilter = (e, filterForm) => {
    e.preventDefault();
    setDefaultPagination({ ...pagination, page: 1 });
    setFilterParams(filterForm);
    UserAction.filterUsers({body: { ...pagination, page: 1, ...filterForm }, dispatch});
  }

  const resetLeadFilterForm = (data) => {
    setFilterParams(data);
    setDefaultPagination({...pagination, page: 1});
    dispatch(UserAction.getUserList({...pagination}))
  };

  const sortUsers = () =>{
    let tempPagination = {...pagination};
    tempPagination.orderBy = tempPagination.orderBy === "DESC" ? "ASC" : "DESC";
    setDefaultPagination(tempPagination);
    UserAction.filterUsers({
      body: { ...tempPagination, page: 1, ...filterParams },
      dispatch
    });
  }

  const setPagination = (params) => {
    setDefaultPagination({...pagination,...params});
    dispatch (UserAction.getUserList({...pagination,...params,...filterParams} ));
  };

  const toggleActive = (checked, {id}) => {
    let user;
      user = {lifetime : checked};
      dispatch(UserAction.toggleLifetime({user}, id));
    

  };

  const handleDelete = user => {
    commonService.isDialogOpen.onNext({
      open: true,
      data: {
        title: "Delete User!",
        message: "Are you sure you want to delete?"
      },
      cancelText: "Cancel",
      confirmText: "Okay",
      onCancel: () => commonService.isDialogOpen.onNext(false),
      onConfirm: () => deleteUser(user)
    });
  };

  const deleteUser = user => {
    if (user) dispatch(UserAction.deleteUser(user.id)).then(res => {
      commonService.forSuccess("User deleted successfully!", "Success");
    });
    commonService.isDialogOpen.onNext(false);
  };

  const resendPassword = user => {dispatch(UserAction.resendPassword({user: {email: user.email}})).then(res => {
      commonService.forSuccess("Reset Password link sent successfully!", "Success");
    });
  };
  return (
    <>
      <Form currentUser={currentUser}
                setCurrentUser={setCurrentUser}>
              </Form>
      <Filter
            resetLeadFilterForm={resetLeadFilterForm}
            handleFilter={handleFilter}
            />        
      <div className="p-2">

        <UserTable userList={userList} totalCount={count}
            pagination={pagination}
            sortUsers={sortUsers}
                   resendPassword={resendPassword}
                   handleDelete={handleDelete}
            toggleActive={toggleActive}
            setPagination={setPagination}>

        </UserTable>
      </div>
    </>
  );
};

export default UserList;
