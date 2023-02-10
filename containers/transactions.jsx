import {
  getSentTransactions,
  getReceiveTransactions,
} from "@/lib/getTransactions";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PaidTo from "@/components/sent-transactions";
import PaidFrom from "@/components/received-transactions";
import { Skeleton } from "@mantine/core";
import { useAddress } from "@thirdweb-dev/react";
import { TbRefresh } from "react-icons/tb";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export default function TransactionsContainer() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const [paidTo, setPaidTo] = useState([]);
  const [paidFrom, setPaidFrom] = useState([]);
  const address = useAddress();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function getHistory() {
    setPaidTo([]);
    setPaidFrom([]);

    getSentTransactions(address).then((res) => {
      setPaidTo(res.transfers.reverse());
    });
    getReceiveTransactions(address).then((res) => {
      setPaidFrom(res.transfers.reverse());
    });
  }

  useEffect(() => {
    if (address) {
      getHistory();
    }
  }, [address]);

  return (
    <div className="w-full flex flex-col items-start">
      <div className="flex flex-col mt-10 bg-white shadow-lg rounded-lg w-full clip">
        <p
          className="text-[22px] font-exo font-bold p-5 text-white bg-secondary flex items-center justify-between cursor-pointer"
          onClick={getHistory}
        >
          Transactions
          <span>
            <TbRefresh size={28} />
          </span>
        </p>
        <div className={classes.root}>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            className={classes.appBar}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="SENT TO" {...a11yProps(0)} />
              <Tab label="RECEIVED FROM" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Skeleton visible={paidTo?.length == 0}>
                <PaidTo data={paidTo} />
              </Skeleton>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Skeleton visible={paidFrom?.length == 0} >
                <PaidFrom data={paidFrom} />
              </Skeleton>
            </TabPanel>
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}
