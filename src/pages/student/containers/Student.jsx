import {useIntl} from 'react-intl';
import React, {useEffect, useState} from 'react';
import {createUseStyles} from "react-jss";
import useTheme from "../../../misc/hooks/useTheme";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../../components/Loading";
import Typography from "../../../components/Typography";
import Card from "../../../components/Card";
import CardTitle from "../../../components/CardTitle";
import IconButton from "../../../components/IconButton";
import IconEdit from 'components/icons/Edit';
import IconClose from 'components/icons/Close';
import CardContent from "../../../components/CardContent";
import TextField from "../../../components/TextField";
import CardActions from "../../../components/CardActions";
import Button from "../../../components/Button";
import useChangePage from "../../../misc/hooks/useChangePage";
import CardHeader from "../../../components/CardHeader";
import Snackbar from "../../../Snackbar/Snackbar";
import Select from "../../../components/Select";
import MenuItem from "../../../components/MenuItem";
import exportFunctions from "../actions/student";
import groupsActions from "../../groups/actions/groups";
import pageURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";

const getClasses = createUseStyles((theme) => ({
  container: {
    position: "relative",
  },
  fieldContainer: {
    display: "flex",
    alignItems: "center",
  },
  fieldContainerKey: {
    fontSize: "16px",
  },
  fieldContainerKeyWrapper: {
    width: "30%",
    flexShrink: 0,
    marginTop: "12px"
  },
  fieldContainerValue: {
    fontSize: "16px",
    marginTop: "12px",
    minHeight: "33px",
    display: "flex",
    alignItems: "center"
  },
  fieldContainerValueWrapper: {
    width: "100%",
  },
  iconWrapper: {
    position: "absolute",
    top: "5px",
    right: "5px"
  },
  boldTitle: {
    fontWeight: "bold",
    margin: "6px 0",
    fontSize: "24px"
  },
  cardContentWrapper: {
    paddingBottom:"20px"
  },
  selectContainer: {
    marginTop: "10px"
  }
}));

function Student() {
  const { formatMessage } = useIntl();
  const { theme } = useTheme();
  const classes = getClasses({ theme });
  const dispatch = useDispatch();
  const { id } = useParams();
  const changePage = useChangePage();
  const isCreateMode = id === 'create';

  const {
    studentInfo,
    isFailed,
    isFailedUpdate,
    isFetching,
    isFetchingUpdate,
    isFinishedUpdate,
    isFetchingCreate,
    isSuccessCreate,
    isErrorCreate,
    errorMessage,
  } = useSelector(({ student }) => student);

  const {
    isFailed: isFailedGroups,
    isFetching: isFetchingGroups,
    groups: groupsList,
  } = useSelector(({ groups }) => groups);


  const [state, setState] = useState({
    name: '',
    surname: '',
    averageGrade: '',
    groupId: '',
    groupName: null,
    isEditInfo: isCreateMode,
    validationErrors: {},
  })

  useEffect(() => {
    if (id !== 'create') {
      dispatch(exportFunctions.fetchReceiveStudent(id));
    }
    return () => {
      dispatch(exportFunctions.fetchResetStudentData())
    }
  }, [id]);

  useEffect(() => {
    dispatch(groupsActions.fetchGroups())
  }, [id]);

  useEffect(() => {
    let isEditInfo = state.isEditInfo;
    if (isFinishedUpdate) {
      isEditInfo = isFailedUpdate;
    }
    setState({
      ...state,
      isEditInfo,
    });
  }, [isFetchingUpdate]);

  useEffect(() => {
    let isEditInfo = state.isEditInfo;
    if (isSuccessCreate) {
      isEditInfo = isErrorCreate;
      changePage({
        pathname: `${pageURLs[pages.studentPage]}/${studentInfo.id}/`,
        replace: true,
      });
    }
    setState({
      ...state,
      isEditInfo,
    });
  }, [isFetchingCreate]);


  const validationMessages = {
    name: "name.cannotBeEmpty",
    surname: "surname.cannotBeEmpty",
    averageGrade: "averageGrade.mustBeNumberInRange",
    groupName: "groupName.mustBeFilled",
  }

  const tableRows = [
    {
      rowName: "name",
      rowValue: studentInfo.name || ' ',
      rowType: "text",
    },
    {
      rowName: "surname",
      rowValue: studentInfo.surname || ' ',
      rowType: "text",
    },
    {
      rowName: "averageGrade",
      rowValue: studentInfo.averageGrade || ' ',
      rowType: "text",
    },
    {
      rowName: "groupName",
      rowValue: studentInfo.groupName || ' ',
      rowType: "select",
    },
  ];

  const handleInputChange = ({target, tableRow} ) => {
    setState({
      ...state,
      [tableRow.rowName]: target.value,
    })
  }

  const findGroupId = (groupName) => {
    const foundGroup = groupsList.find(group => group.name === groupName);
    return foundGroup ? foundGroup.id : null;
  }

  const isValidBeforeSave = () => {
    const { name, surname, averageGrade, groupName } = state;
    const validationErrors = {};

    validationErrors.name = name ? "" : validationMessages.name;
    validationErrors.surname = surname ? "" : validationMessages.surname;
    validationErrors.averageGrade = averageGrade && !isNaN(averageGrade) ? "" : validationMessages.averageGrade;
    validationErrors.groupName = groupName ? "" : validationMessages.groupName

    const hasErrors = Object.values(validationErrors).some(error => error);

    setState({ ...state, validationErrors });
    return !hasErrors;
  };

  const onSaveAction = () => {
    const isValid = isValidBeforeSave()
    if (!isValid) {
      return;
    }
    if (!isCreateMode) {
      dispatch(exportFunctions.fetchUpdateStudent({
        id: studentInfo.id,
        name: state.name,
        surname: state.surname,
        averageGrade: state.averageGrade,
        groupId: state.groupId,
        groupName: state.groupName
      }));
    } else {
      dispatch(exportFunctions.fetchCreateStudent({
        name: state.name,
        surname: state.surname,
        averageGrade: state.averageGrade,
        groupId: state.groupId
      }));
    }
  }

  const renderActionButton = () => {
    if (state.isEditInfo && !isCreateMode) {
      return (
        <IconButton
          disableHoverSpace
          onClick={() => setState({
            ...state,
            isEditInfo: false,
          })}>
          <IconClose />
        </IconButton>
      )
    }
    if (!state.isEditInfo) {
      return (
        <IconButton
          disableHoverSpace
          onClick={() => setState({
            ...state,
            name: studentInfo.name,
            surname: studentInfo.surname,
            averageGrade: studentInfo.averageGrade,
            groupId: studentInfo.groupId,
            groupName: studentInfo.groupName,
            isEditInfo: true,
          })}>
          <IconEdit />
        </IconButton>
      )
    }
  }

  const getInputComponentByType = (tableRow) => {
    if (tableRow.rowType === 'text') {
      return (
        <TextField
          disabled={isFetchingUpdate}
          fullWidth
          onChange={({target}) => handleInputChange({target, tableRow})}
          size="small"
          value={state[tableRow.rowName]}
          variant="standard"
        />
      )
    }
    if (tableRow.rowType === 'select') {
      return (
        <div className={classes.selectContainer}>
          <Select
            fullWidth
            onChange={({target}) => {
              setState({
                ...state,
                groupName: target.value,
                groupId: findGroupId(target.value),
              })
            }}
            value={state.groupName}
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
      )
    }
  }

  return (
    <div className={classes.container}>
      {(isFailed || isFetching || isFailedGroups || isFetchingGroups)
        && (
          <Loading variant={isFailed || isFailedGroups ? 'error' : 'loading'}>
            {isFailed || isFailedGroups && (
              <Typography color="secondary" variant="subtitle">
                {formatMessage({id: 'loading.error'})}
              </Typography>
            )}
          </Loading>
        )}

      {(!isFailed || !isFetching && (!isFailedGroups || !isFetchingGroups)) && (
        <Card
          disablePaddings
        >
          <CardHeader
            avatar={
              <Button
                disabled={isFetchingUpdate || isFetchingCreate}
                onClick={() => {
                  changePage({
                    pathname: `${pageURLs[pages.studentPage]}/`,
                  });
                }}
                variant="secondary"
              >
                <Typography color="inherit">
                  {formatMessage({id: 'back'})}
                </Typography>
              </Button>
            }
          />

          <CardTitle>
            <Typography
              color="secondary"
              variant="title">
                <div className={classes.boldTitle}>
                  {formatMessage({id: "detailedInfo"})}
                </div>
            </Typography>
          </CardTitle>
          <div className={classes.iconWrapper}>
            {renderActionButton()}
          </div>
          <div className={classes.cardContentWrapper}>
          <CardContent>
            {tableRows.map(tableRow => {
              return (
                <div key={tableRow.rowName} className={classes.fieldContainer}>
                  <div className={classes.fieldContainerKeyWrapper}>
                    <Typography
                      color="secondary"
                    >
                      <div className={classes.fieldContainerKey}>
                        {formatMessage({id: `studentRow.${tableRow.rowName}`})}
                      </div>
                    </Typography>
                  </div>
                  <div className={classes.fieldContainerValueWrapper}>
                    {state.isEditInfo ? (
                      <>
                        {getInputComponentByType(tableRow)}
                        {state.validationErrors[tableRow.rowName] && (
                          <Typography
                            color="error"
                          >
                            {formatMessage({id: `validation.${state.validationErrors[tableRow.rowName]}`})}
                          </Typography>
                        )}
                      </>
                    ) : (
                      <Typography
                        color="secondary"
                      >
                      <div className={classes.fieldContainerValue}>
                        {tableRow.rowValue}
                      </div>
                    </Typography>)}
                  </div>
                </div>
              )
            })}
          </CardContent>
          </div>
        </Card>
      )}
      {state.isEditInfo && (
        <CardActions>
          {!isCreateMode ?
            <Button
              disabled={isFetchingUpdate}
              onClick={() => {
                setState({
                  ...state,
                  validationErrors: {},
                  isEditInfo: false,
                })
              }}
              variant="secondary"
            >
              <Typography color="inherit">
                {formatMessage({ id: 'cancel' })}
              </Typography>
            </Button>
            :
            <Button
              disabled={isFetchingUpdate || isFetchingCreate}
              onClick={() => {
                changePage({
                  pathname: `${pageURLs[pages.studentPage]}/`,
                });
              }}
              variant="secondary"
            >
              <Typography color="inherit">
                {formatMessage({id: 'back'})}
              </Typography>
            </Button>
          }
          <Button
            isLoading={isFetchingUpdate}
            onClick={() => onSaveAction()}
            variant="primary"
          >
            <Typography color="inherit">
              {formatMessage({ id: 'save' })}
            </Typography>
          </Button>
        </CardActions>
      )}

      <Snackbar
        autoHide
        open={!!errorMessage}
      >
        <div>
          <Card variant="error">
            <CardTitle>
              {errorMessage}
            </CardTitle>
          </Card>
        </div>
      </Snackbar>
    </div>
  );
}



export default Student;
