import {useIntl} from 'react-intl';
import React, {useEffect, useState} from 'react';
import Typography from 'components/Typography';
import {createUseStyles} from "react-jss";
import useTheme from "../../../misc/hooks/useTheme";
import TextField from "../../../components/TextField";
import {useDispatch, useSelector} from "react-redux";
import IconDelete from 'components/icons/Delete';
import IconClose from 'components/icons/Close';
import useLocationSearch from "../../../misc/hooks/useLocationSearch";
import useChangePage from "../../../misc/hooks/useChangePage";
import Loading from "../../../components/Loading";
import Button from "../../../components/Button";
import MenuItem from "../../../components/MenuItem";
import Select from "../../../components/Select";
import Dialog from "../../../components/Dialog";
import Card from "../../../components/Card";
import CardTitle from "../../../components/CardTitle";
import CardContent from "../../../components/CardContent";
import CardActions from "../../../components/CardActions";
import TableRow from "../../../components/TableRow";
import Table from "../../../components/Table";
import TableHead from "../../../components/TableHead";
import TableCell from "../../../components/TableCell";
import TableBody from "../../../components/TableBody";
import IconButton from "../../../components/IconButton";
import TableFooter from "../../../components/TableFooter/TableFooter";
import TablePagination from "../../../components/TablePagination/TablePagination";
import Snackbar from "../../../Snackbar/Snackbar";
import TableCellAction from "../../../components/TableCellAction";
import studentsActions from "../actions/students";
import groupsActions from "../../groups/actions/groups";

const getClasses = createUseStyles((theme) => ({
  pageWrapper: {
    padding: `${theme.spacing(2)}px`,
    background: "#e6e6e6"
  },
  secretHeader: {
    marginTop: '20px',
    padding: '25px',
    backgroundColor: '#161616',
    borderRadius: '4px',
  },
  secretHeaderContent: {
    margin: "10px",
    color: '#16BB06',
    fontSize: '25px'
  },
  filterInnerPanel: {
    alignItems: 'center',
    display: 'flex',
    gap: '20px',
  },
  filterInnerPanelSelectContainer: {
    minWidth: "200px"
  },
  filterPanel: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: "10px",
    marginBottom: "30px"
  },

  filterContainer: {
    display: 'flex',
    flex: 1.5,
    gap: '10px'
  },
  monthSelect: {
    marginTop: '5px',
    width: '100px',
    backgroundColor: "gray"
  },
  studentsList: {
    marginTop: '20px',
    borderRadius: "4px",
  },
  studentsListHeader: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "5px",
    borderBottom: "20px",
  },
  studentListItem: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "wrap",
    marginTop: "5px",
  },
  deleteButton: {
    visibility: 'hidden',
  },
  hoverRow: {
    cursor: "pointer",
    '&:hover $deleteButton': {
      visibility: "visible",
    },
  },
  buttonTextContainer: {
    fontWeight: 500,
    fontSize: "0.875rem"
  },
  tableCell: {
    padding: "8px !important"
  }
}));

function Students() {
  const { formatMessage } = useIntl();
  const { theme } = useTheme();
  const classes = getClasses({ theme });
  const locationSearch = useLocationSearch();
  const changePage = useChangePage();
  const pageIndex = +locationSearch.pageIndex || 0;
  const pageSize = +locationSearch.pageSize || 10;
  const dispatch = useDispatch();
  const averageGrades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const {
    isFailed: isFailedStudents,
    isFetching: isFetchingStudents,
    isSuccess: isSuccessStudents,
    isFetchingDelete,
    isSuccessDelete,
    isErrorDelete,
    students: studentsList,
    totalCount: studentsTotalCount,
    errorMessage,
  } = useSelector(({ students }) => students);

  const {
    isFailed: isFailedGroups,
    isFetching: isFetchingGroups,
    groups: groupsList,
  } = useSelector(({ groups }) => groups);

  const [state, setState] = useState({
    totalStudents: null,
    searchText: sessionStorage.getItem('searchText') || '',
    group: sessionStorage.getItem('group') || null,
    groupFilter: sessionStorage.getItem('groupFilter') || null,
    gradeFilter: sessionStorage.getItem('gradeFilter') || null,
    studentIdToDelete: null,
    successAlertMessage: null,
  });

  useEffect(() => {
    console.log(state.groupFilter)
    dispatch(groupsActions.fetchGroups())
  }, []);

  useEffect(() => {
    if (isSuccessStudents) {
      setState({
        ...state,
        successAlertMessage: "success.fetchingStudents",
      })
    }

  }, [isFetchingStudents]);

  useEffect(() => {
    if (isSuccessDelete) {
      setState({
        ...state,
        studentIdToDelete: null,
        successAlertMessage: "success.deleteStudent"
      });
    }
  }, [isFetchingDelete]);

  useEffect(() => {
    dispatch(studentsActions.fetchStudents({
      pageIndex,
      pageSize,
      searchText: state.searchText,
      groupFilter: state.groupFilter,
      gradeFilter: state.gradeFilter
    }))
    return () => {
      sessionStorage.setItem('searchText', state.searchText);
      sessionStorage.setItem('group', state.group);
      sessionStorage.setItem('groupFilter', state.groupFilter);
      sessionStorage.setItem('gradeFilter', state.gradeFilter);
    }
  }, [
    state.searchText,
    pageIndex,
    pageSize,
    state.gradeFilter,
    state.groupFilter
  ]);

  const onCloseDeleteDialog = () => {
    setState({
      ...state,
      studentIdToDelete: null,
    })
  }

  const findGroupId = (groupName) => {
    const foundGroup = groupsList.find(group => group.name === groupName);
    return foundGroup ? foundGroup.id : null;
  }

  return (
    <div className={classes.pageWrapper}>
      {isFetchingGroups || isFailedGroups && (
        <Loading variant={isFailedGroups ? 'error' : 'loading'}>
          {isFailedGroups && (
            <Typography color="secondary" variant="subtitle">
              {formatMessage({id: 'loading.filters.error'})}
            </Typography>
          )}
        </Loading>
      )}
      {!isFetchingGroups && !isFailedGroups && (
        <div className={classes.filterPanel}>
          <div className={classes.filterInnerPanel}>
            <div className={classes.filterInnerPanelSelectContainer}>
            <Select
              fullWidth
              onChange={({target}) => {
                setState({
                  ...state,
                  group: target.value,
                  groupFilter: findGroupId(target.value),
                })
              }}
              value={state.group}
              displayEmpty
              variant="outlined"
              size="small"
            >
              <MenuItem value={null}>
                {formatMessage({id: "filter.group.empty"})}
              </MenuItem>
              {groupsList.map((group) => (
                <MenuItem value={group.name}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
            </div>
            <div className={classes.filterInnerPanelSelectContainer}>
            <Select
              fullWidth
              onChange={({target}) => setState({
                ...state,
                gradeFilter: target.value,
              })}
              value={state.gradeFilter}
              displayEmpty
              variant="outlined"
              size="small"
              >
              <MenuItem value={null}>
                {formatMessage({id: "filter.grade.empty"})}
              </MenuItem>
              {averageGrades.map((grade) => (
                <MenuItem value={grade}>
                  {grade}
                </MenuItem>
              ))}
            </Select>
            </div>
            <TextField
              inputType="text"
              label={formatMessage({ id: 'findStudents' })}
              onChange={({target}) => setState({
                ...state,
                searchText: target.value
              })}
              value={state.searchText}
            />
          </div>

          <Button
            disabled={isFetchingStudents || isFetchingGroups}
            onClick={() => changePage({
              pathname: "create",
            })}
            variant="primary"
          >
            <Typography color="inherit">
              <div className={classes.buttonTextContainer}>
                {formatMessage({ id: 'add' })}
              </div>
            </Typography>
          </Button>
        </div>
      )}
      <div>
        {(isFetchingStudents || isFailedStudents)
          && (
            <Loading variant={isFailedStudents ? 'error' : 'loading'}>
              {isFailedStudents && (
                <Typography color="secondary" variant="subtitle">
                  {formatMessage({id: 'loading.error'})}
                </Typography>
              )}
            </Loading>
          )}
        {!isFetchingStudents && !isFailedStudents && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subTitle">
                    {formatMessage({id: "student.name"})}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subTitle">
                    {formatMessage({id: "student.group"})}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subTitle">
                    {formatMessage({id: "student.grade"})}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subTitle">
                    {formatMessage({id: "actions"})}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsList?.map(item => (
                <TableRow
                  key={item.id}
                  hover
                >
                  <TableCell
                    onClick={() => changePage({
                      pathname: String(item.id),
                    })}
                  >
                    <Typography variant="subTitle">
                      {item.fullName}
                    </Typography>
                  </TableCell>
                  <TableCell
                    onClick={() => changePage({
                      pathname: String(item.id),
                    })}
                  >
                    <Typography variant="subTitle">
                      {item.groupName}
                    </Typography>
                  </TableCell>
                  <TableCell
                    onClick={() => changePage({
                      pathname: String(item.id),
                    })}
                  >
                    <Typography variant="subTitle">
                      {item.averageGrade}
                    </Typography>
                  </TableCell>
                  <TableCellAction>
                    <IconButton
                      onClick={() => setState({
                        ...state,
                        studentIdToDelete: item.id
                      })
                      }>
                      <IconDelete
                        size={32}
                      />
                    </IconButton>
                  </TableCellAction>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                count={studentsTotalCount}
                page={pageIndex}
                onPageChange={(event, pageIndex) => changePage({
                  locationSearch: {
                    ...locationSearch,
                    pageIndex,
                  },
                  replace: true,
                })}
                onRowsPerPageChange={({target}) => changePage({
                  locationSearch: {
                    ...locationSearch,
                    pageIndex: 0,
                    pageSize: target.value,
                  },
                  replace: true,
                })}
                rowsPerPage={pageSize}
                labelRowsPerPage={(
                  <Typography
                    color="secondary"
                    variant="caption"
                  >
                    {formatMessage({
                      id: 'pagination.label'
                    })}
                  </Typography>
                )}
              />
            </TableFooter>
          </Table>
        )}
      </div>
      <Dialog
        onClose={onCloseDeleteDialog}
        open={!!state.studentIdToDelete}>
        {isErrorDelete && (
          <Card variant="error">
            <CardTitle>
              <Typography color="error">
                {formatMessage(
                  {
                    id: errorMessage ? 'error' : 'delete.error',
                  },
                  {
                    error: errorMessage
                  }
                )}
              </Typography>
            </CardTitle>
          </Card>
        )}
        <Card>
          <CardTitle>
            <Typography variant="title">
              {formatMessage({id: "delete.title"})}
            </Typography>
            <IconButton
              onClick={onCloseDeleteDialog}
            >
              <IconClose />
            </IconButton>
          </CardTitle>

          <CardContent>
            <Typography>
              {formatMessage({id: "delete.subtitle"})}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={onCloseDeleteDialog}
            >
              <Typography>
                {formatMessage({id: "cancel"})}
              </Typography>
            </Button>
            <Button
              isLoading={isFetchingDelete}
              onClick={() => dispatch(studentsActions.fetchDeleteStudent(
                {
                  id: state.studentIdToDelete,
                  pageIndex,
                  pageSize,
                  searchText: state.searchText,
                  groupFilter: state.groupFilter,
                  gradeFilter: state.gradeFilter
                }))}
            >
              <Typography>
                {formatMessage({id: "delete"})}
              </Typography>
            </Button>
          </CardActions>
        </Card>
      </Dialog>

      <Snackbar
        autoHide
        onClose={() => setState({
          ...state,
          successAlertMessage: null,
        })}
        open={!!state.successAlertMessage}
      >
        <div>
          <Card variant="success">
            <CardTitle>
              {state.successAlertMessage ? (
                <Typography color="success">
                  {formatMessage({ id: state.successAlertMessage })}
                </Typography>
              ) : null}
            </CardTitle>
          </Card>
        </div>
      </Snackbar>
    </div>
  );
}



export default Students;
