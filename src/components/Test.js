import React, { useEffect, useState, useRef } from "react";
//import NavBar from './Navbar'
import { Form, Button, Card, Modal, Container, Row } from "react-bootstrap";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import CarsProject from "./CarsProject.json";
import axios from "axios";

let selectedAccount;
let carsContract;
let contractAddress = "0xac38cA2E227c86540C8F16e1d939A0d508deE7d7";
// de implementat event listening + interface update

export default function CarProject() {
  const moment = require("moment");
  const [account, setAcc] = useState();
  const [mycars, setMyCars] = useState([]);
  const [carstoshow, setCarsShow] = useState([]);
  const [carsNo, setCarsNo] = useState(0);
  const [error, setError] = useState();
  const [ShowState, setShow] = useState(true);
  const carNameRef = useRef();
  const newVinRef = useRef();
  const newNameRef = useRef();
  const approvedRef = useRef();
  const addressRef = useRef();
  const [randCar, setRC] = useState(false);
  const [show, setModal] = useState(false);
  const [ckAttack, setCK] = useState();
  const [showMod, setModify] = useState(false);
  const [showTransfer, setTransfer] = useState(false);
  const [transferState,setTransferState] = useState(false);
  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);
  const [activeId, setId] = useState();
  const [activeRating, setRating] = useState();
  const [modifyState, setModState] = useState(false);
  const [attackCK, setAttackCK] = useState("CryptoKitty Attack");

  async function carCreate(event) {
    event.preventDefault();
    setError("");
    try {
      await createRandomCar(carNameRef.current.value);
      //await getCarsDetail();
      setRC(false);
    } catch (error) {
      console.log(error);
      setError(
        "failed to create a car, maybe this account already has a car generated"
      );
    }
  }

 // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function convertTime(time) {
    var dt = new Date(moment.unix(time)._d);
    var today = new Date();
    var dif = dt - today;
    var num = dif / 60000;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    if (rhours < 0) {
      return 0;
    } else {
      return rhours + " hour(s) and " + rminutes + " minute(s).";
    }
    //return (dif/ 3600000)
  }

  function createRandomCar(name) {
    console.log("creating a new car");
    return carsContract.methods
      .createRandCar(name)
      .send({ from: account })
      .on("receipt", async function (receipt) {
        console.log("created a new car");
        await getCarsDetail();
      })
      .on("error", function (error) {
        console.log(error);
      });
  }

  function modifyName(id, name) {
    console.log("modifying name");
    return carsContract.methods
      .modifyName(id, name)
      .send({ from: account }, function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        console.log("Hash of the transaction: " + res);
      });
  }

  function modifyVin(id) {
    console.log("modifying vin");
    return carsContract.methods
      .modifyVin(id, newVinRef.current.value)
      .send({ from: account })
      .on("receipt", function (receipt) {
        console.log("vin modified");
      })
      .on("error", function (error) {
        console.log(error);
      });
  }

  function carTransfer(from,to,id_car){
    console.log("initiating transfer");
    return carsContract.methods
    .transferFrom(from, to,id_car)
    .send({ from: account })
    .on("receipt", function (receipt) {
      console.log("transfer done");
    })
    .on("error", function (error) {
      console.log(error);
    });
  }

  function approveTransfer(approved,id_car){
    console.log("initiating approving");
    return carsContract.methods
    .approve(approved,id_car)
    .send({ from: account })
    .on("receipt", function (receipt) {
      console.log("approve done");
    })
    .on("error", function (error) {
      console.log(error);
    });
  }




  function carRace(id) {
    console.log("racing 2 cars");
    return carsContract.methods
      .race(id, 3)
      .send({ from: selectedAccount })
      .on("receipt", function (receipt) {
        console.log("done race");
        getCarsDetail();
      })
      .on("error", function (error) {
        console.log(error);
      });
  }

  function ckOvertake(id, dna) {
    console.log("overtaking kitty");
    return carsContract.methods
      .overtakeCK(id, dna)
      .send({ from: account })
      .on("receipt", function (receipt) {
        console.log("done");
        getCarsDetail();
      })
      .on("error", function (error) {
        console.log(error);
      });
  }

  function upgradeCar(id) {
    return carsContract.methods
      .overtake(id)
      .send({
        from: account,
        value: Web3.utils.toWei("0.00001", "ether"),
      })
      .on("receipt", function (receipt) {
        console.log("car has been upgraded");
        getCarsDetail();
      })
      .on("error", function (error) {
        console.log(error);
      });
  }

  function randNo(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async function getCarsByOwner() {
    return carsContract.methods.CarsByOwner(selectedAccount).call();
  }

  async function CryptoKitties() {
    try {
      const nr = randNo(5000, 40000);
      const result = await axios.get(
        "https://api.cryptokitties.co/kitties/" + nr
      );
      setCK(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getCarsDetail() {
    handleClose();
    setMyCars([]);
    setCarsShow([]);
    carsContract.methods
              .balanceOf(selectedAccount)
              .call()
              .then((a) => {
                setCarsNo(a) 
              });
    getCarsByOwner().then((result) => {
      for (const i of Object.entries(result)) {
        const id_car = i[1];
        carsContract.methods
          .cars(i[1])
          .call()
          .then((result) => {
            setCarsShow((carstoshow) => [
              ...carstoshow,
              {
                name: result.name,
                vin: result.vin,
                id: id_car,
                rating: result.rating,
                win: result.winCnt,
                pitTime: result.pitTime,
                losses: result.lossCnt,
              },
            ]);
            if (carstoshow.length > 0) {
              setShow(false);
            } else {
              setShow(true);
            }
          });
      }
    });
  }

  useEffect(() => {
    async function load() {
      //let provider = window.ethereum;

      const provider = await detectEthereumProvider();

      if (provider) {
        const web3 = new Web3(provider);
        const networkId = await web3.eth.net.getId();
        carsContract = new web3.eth.Contract(CarsProject.abi, contractAddress);
        provider
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            selectedAccount = accounts[0];
            setAcc(selectedAccount);
            console.log(`Selected account is ${selectedAccount}`);
            carsContract.methods
              .balanceOf(selectedAccount)
              .call()
              .then((a) => {
                setCarsNo(a);
                if (a == 0) {
                  setRC(true);
                } else {
                  setRC(false);
                }
              });
          })
          .catch((err) => {
            console.log(err);
          });

        /// fix account changed function to display cars
        window.ethereum.on("accountsChanged", function (accounts) {
          if (accounts.length > 0) {
            selectedAccount = accounts[0];
            setAcc(selectedAccount);
            setShow(true);
            console.log(`Selected account is ${selectedAccount}`);
            carsContract.methods
              .balanceOf(selectedAccount)
              .call()
              .then((a) => {
                setCarsNo(a);
                if (a == 0) {
                  setRC(true);
                } else {
                  setRC(false);
                }
              });
          } else {
            console.log("no account");
            setAcc(undefined);
            selectedAccount = 0;
          }
        });
      }
    }
    load();
  }, []);
  return (
    <>
      <h1
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        CRYPTO CARS NFT
      </h1>

      {(ShowState || carsNo==0) && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Card bg={"dark"} text={"light"} style={{ width: 500 }}>
            <Card.Header>Crypto Cars NFT Game - DEMO</Card.Header>
            <Card.Body>
              <Card.Title>Welcome to the Game</Card.Title>

              {account && (
                <>
                  <Card.Text>
                    Currently the account selected is {account}
                  </Card.Text>
                  <Card.Text>Cars in garage: {carsNo}</Card.Text>
                  <Button
                    variant="outline-danger"
                    onClick={async () => {
                      await getCarsDetail();
                    }}
                  >
                    Show Cars
                  </Button>
                  {(randCar || carsNo==0) && (
                    <div>
                      <Form onSubmit={carCreate}>
                        <Form.Group id="text">
                          <Form.Label>Car Name</Form.Label>
                          <Form.Control
                            className="w-50 mt-1"
                            type="text"
                            ref={carNameRef}
                            required
                          />
                        </Form.Group>
                        <Button className="w-50 mt-2" type="submit">
                          Create Random Car
                        </Button>
                      </Form>
                    </div>
                  )}
                </>
              )}

              {!account && (
                <>
                  <h4>
                    To connect to MetaMask refresh page or access the
                    extension...
                  </h4>
                </>
              )}
            </Card.Body>
          </Card>
        </div>
      )}

      {(!ShowState || carsNo>0) && (
        <>
        <h4
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Current account: {account}
      </h4>
        <div>
          <Container>
            {carstoshow.map((car) => (
              <Row
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card
                  bg={"dark"}
                  text={"light"}
                  className="mt-3"
                  style={{ width: 500, height: 500 }}
                >
                  <Card.Header>Crypto Cars NFT Garage</Card.Header>
                  <Card.Body>
                    <Card.Title className="mb-5">
                      {car.name.toUpperCase()}
                    </Card.Title>
                    <h1
                      style={{
                        position: "absolute",
                        top: 90,
                        left: 15,
                        fontSize: "100%",
                        color: "white",
                      }}
                    >
                      Rating: {car.rating}
                    </h1>
                    <h1
                      style={{
                        position: "absolute",
                        top: 90,
                        left: 150,
                        fontSize: "100%",
                        color: "white",
                      }}
                    >
                      Car ID: {car.id}
                    </h1>
                    <h1
                      style={{
                        position: "absolute",
                        top: 115,
                        left: 150,
                        fontSize: "100%",
                        color: "white",
                      }}
                    >
                      Losses: {car.losses}
                    </h1>
                    <h1
                      style={{
                        position: "absolute",
                        top: 115,
                        left: 15,
                        fontSize: "100%",
                        color: "white",
                      }}
                    >
                      VIN: {car.vin}
                    </h1>
                    <h1
                      style={{
                        position: "absolute",
                        top: 140,
                        left: 150,
                        fontSize: "100%",
                        color: "white",
                      }}
                    >
                      Pit Time: {convertTime(car.pitTime)}
                    </h1>
                    <h1
                      style={{
                        position: "absolute",
                        top: 140,
                        left: 15,
                        fontSize: "100%",
                        color: "white",
                      }}
                    >
                      Victories: {car.win}
                    </h1>
                    <img
                      style={{
                        width: 400,
                        top: 170,
                        left: 50,
                        position: "absolute",
                      }}
                      src={`${process.env.PUBLIC_URL}/backgrounds/${
                        (car.vin[1] + car.vin[2]) % 3
                      }.png`}
                      alt=""
                    />
                    <img
                      style={{
                        position: "absolute",
                        top: 170,
                        left: 70,
                        width: 350,
                      }}
                      src={`${process.env.PUBLIC_URL}/carvariants/${
                        (car.vin[0] + car.vin[1]) % 9
                      }.png`}
                      alt=""
                    />
                    <img
                      style={{
                        width: 65,
                        top: 180,
                        left: 90,
                        position: "absolute",
                      }}
                      src={`${process.env.PUBLIC_URL}/logos/${
                        car.vin[6] % 9
                      }.png`}
                      alt=""
                    />
                    <img
                      style={{
                        width: 65,
                        top: 180,
                        left: 220,
                        position: "absolute",
                      }}
                      src={`${process.env.PUBLIC_URL}/logos/${
                        car.vin[3] % 9
                      }.png`}
                      alt=""
                    />
                    <img
                      style={{
                        width: 65,
                        top: 180,
                        left: 330,
                        position: "absolute",
                      }}
                      src={`${process.env.PUBLIC_URL}/logos/${
                        car.vin[4] % 9
                      }.png`}
                      alt=""
                    />
                    <h1
                      style={{
                        position: "absolute",
                        top: 375,
                        left: 195,
                        fontSize: "120%",
                        color: "black",
                      }}
                    >
                      {car.name.toUpperCase()}
                    </h1>
                    <Button
                      variant="outline-success"
                      style={{
                        position: "absolute",
                        top: 50,
                        right: 30,
                        width: 130,
                      }}
                      onClick={ async () => {
                        await setId(car.id)
                        setTransfer(true);
                      }}
                    >
                      Transfer Menu
                    </Button>
                    <Modal
                      show={showTransfer}
                      onHide={() => setTransfer(false)}
                      backdrop="static"
                      keyboard={false}
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>
                          {!transferState && <>Transfer Menu</>}
                          {transferState && <>Transfer in progress...</>}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form
                          onSubmit={async (event) => {
                            event.preventDefault();
                            setTransferState(true);
                            //here to modify 
                            await carTransfer(
                              account,
                              addressRef.current.value,activeId
                            ).on("error",function(error){
                              setTransferState(false);
                            });
                            getCarsDetail();
                            setTransferState(false);
                            setTransfer(false);
                          }}
                        >
                          <Form.Group id="text">
                            <Form.Label>
                              Enter the account for transfer
                            </Form.Label>
                            <Form.Control
                              className="w-50 mt-1"
                              type="text"
                              ref={addressRef}
                              required
                            />
                          </Form.Group>
                          <Button className="w-50 mt-2" type="submit" variant="success">
                            Transfer
                          </Button>
                        </Form>
                        <Form
                          onSubmit={async (event) => {
                            event.preventDefault();
                            setTransferState(true);
                            await approveTransfer(approvedRef.current.value,activeId)
                            .on("error",function(error){
                              setTransferState(false);
                            });
                            getCarsDetail();
                            setTransfer(false);
                            setTransferState(false);
                            setTransfer(false);
                          }}
                          className="mt-3"
                        >
                          <Form.Group id="text">
                            <Form.Label>Enter account address to approve</Form.Label>
                            <Form.Control
                              className="w-50 mt-1"
                              type="text"
                              ref={approvedRef}
                              required
                            />
                          </Form.Group>
                          <Button className="w-50 mt-2" type="submit" variant="success">
                            Approve
                          </Button>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={() => setTransfer(false)}
                        >
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {car.rating > 2 && (
                      <>
                        <Button
                          variant="outline-primary"
                          style={{
                            position: "absolute",
                            top: 95,
                            right: 30,
                            width: 130,
                          }}
                          onClick={async () => {
                            await setId(car.id);
                            await setRating(car.rating);
                            setModify(true);
                          }}
                        >
                          Modify Menu
                        </Button>
                        <Modal
                          show={showMod}
                          onHide={() => setModify(false)}
                          backdrop="static"
                          keyboard={false}
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>
                              {!modifyState && <>Modify Menu</>}
                              {modifyState && <>Modifying in progress...</>}
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form
                              onSubmit={async (event) => {
                                event.preventDefault();
                                setId(car.id);
                                setModState(true);
                                await modifyName(
                                  activeId,
                                  newNameRef.current.value
                                ).on("error",function(error){
                                  setModState(false);
                                });
                                getCarsDetail();
                                setModState(false);
                                setModify(false);
                              }}
                            >
                              <Form.Group id="text">
                                <Form.Label>Enter new car name</Form.Label>
                                <Form.Control
                                  className="w-50 mt-1"
                                  type="text"
                                  ref={newNameRef}
                                  required
                                />
                              </Form.Group>
                              <Button className="w-50 mt-2" type="submit">
                                Modify Name
                              </Button>
                            </Form>
                            {activeRating > 5 && (
                              <Form
                                onSubmit={async (event) => {
                                  setId(car.id);
                                  event.preventDefault();
                                  await modifyVin(activeId).on("error",function(error){
                                    setModState(false);
                                  });
                                  getCarsDetail();
                                  setModify(false);
                                }}
                                className="mt-3"
                              >
                                <Form.Group id="text">
                                  <Form.Label>Enter new vin</Form.Label>
                                  <Form.Control
                                    className="w-50 mt-1"
                                    type="text"
                                    ref={newVinRef}
                                    required
                                  />
                                </Form.Group>
                                <Button className="w-50 mt-2" type="submit">
                                  Modify Vin
                                </Button>
                              </Form>
                            )}
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={() => setModify(false)}
                            >
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </>
                    )}
                    {convertTime(car.pitTime) == 0 && (
                      <>
                        <Button
                          variant="danger"
                          style={{
                            position: "absolute",
                            top: 440,
                            left: 205,
                          }}
                          onClick={async () => {
                            await carRace(car.id);
                          }}
                        >
                          Attack Car
                        </Button>
                        <Button
                          variant="danger"
                          style={{
                            position: "absolute",
                            top: 440,
                            left: 340,
                          }}
                          onClick={async () => {
                            await setId(car.id);
                            await CryptoKitties();
                            setModal(true);
                          }}
                        >
                          Attack Kitty
                        </Button>
                      </>
                    )}
                    {ckAttack && (
                      <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>{attackCK}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <img style={{}} src={ckAttack.image_url} alt="" />
                          <h1
                            style={{
                              fontSize: "140%",
                              color: "black",
                            }}
                          >
                            {ckAttack.name}
                          </h1>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button
                            variant="danger"
                            onClick={async () => {
                              setAttackCK("Attacking a Kitty...");
                              await ckOvertake(activeId, ckAttack.id);
                              setAttackCK("CryptoKitty Attack");
                            }}
                          >
                            Attack {ckAttack.id} - {activeId}
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    )}
                    <div>
                      <Button
                        variant="success"
                        style={{
                          position: "absolute",
                          top: 440,
                          left: 50,
                        }}
                        onClick={async () => {
                          upgradeCar(car.id);
                        }}
                      >
                        Upgrade car
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Row>
            ))}
          </Container>
        </div>
        </>
      )}
    </>
  );
}
