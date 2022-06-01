import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {v4 as uuidv4} from 'uuid';

export const TramDeparture: React.FC<any> = ({tramDataSolros, tramDataMunk}) => {
    const [solDepList, setSolDepList] = useState<string[]>([]);
    const [munkDepList, setMunkDepList] = useState<string[]>([]);
    let solrosList: any[] = [];
    let munkList: any[] = [];
    const setLists = (list: any, listToSet: any) => {
        if (list) {
            list.Departure.forEach((dep: any) => {
                listToSet.push(dep.rtTime);
            })
        }
    }
    setLists(tramDataSolros, solrosList);
    setLists(tramDataMunk, munkList);

    const arrayEquals = (a: string[], b: string[]) => {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

    const calcSolDepTime = (departures: any) => {
        solrosList = [];
        departures.forEach((dep: any, index: number) => {
            let startTime = new Date();
            if (navigator.platform && /iPad/.test(navigator.platform)) {
                startTime.setHours(startTime.getHours() + 2);
            }
            let endTime = dep.rtTime ? new Date(dep.date + 'T' + dep.rtTime) : new Date(dep.date + 'T' + dep.time) ;
            let difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
            let resultInMinutes = Math.round(difference / 60000);
            resultInMinutes = resultInMinutes -1;
            if (resultInMinutes === 0) {
                solrosList.push('Nu');
            } else if (resultInMinutes < 0 || isNaN(resultInMinutes)){
                console.log(resultInMinutes);
                solrosList.splice(index, 1);
                departures.splice(index, 1);
            } else {
                solrosList.push(resultInMinutes)
            }
        })
        if (!arrayEquals(solDepList, solrosList)) {
            setSolDepList(solrosList);
        }
    }

    const calcMunkDepTime = (departures: any) => {
        munkList = [];
        departures.forEach((dep: any, index: number) => {
            let formatedDate = dep.date.replace(/-/g, "/");
            let startTime = new Date();
            if (navigator.platform && /iPad/.test(navigator.platform)) {
                startTime.setHours(startTime.getHours() + 2);
            }
            let endTime = dep.rtTime ? new Date(dep.date + 'T' + dep.rtTime) : new Date(dep.date + 'T' + dep.time) ;
            let difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
            let resultInMinutes = Math.round(difference / 60000);
            resultInMinutes = resultInMinutes -1;
            if (resultInMinutes === 0) {
                munkList.push('Nu');
            } else if (resultInMinutes < 0 || isNaN(resultInMinutes)){
                departures.splice(index, 1);
                munkList.splice(index, 1);
            } else {
                munkList.push(Math.round(resultInMinutes))
            }
        })
        if (!arrayEquals(munkDepList, munkList)) {
            setMunkDepList(munkList);
        }
    }
    setInterval(() => {
        calcSolDepTime(tramDataSolros.Departure);
        calcMunkDepTime(tramDataMunk.Departure);
    }, 5000);
    return (
        <>
        <div style={{paddingLeft: 20, margin: 0}}>
            <h2 style={{color: "white"}}>Spårvagns avgångar</h2>
        </div>
        <StyledWeather>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <h4>Solrosgatan</h4>
                <h4>Munkebäckstorget</h4>
            </div>
            <div style={{display: "flex"}}>
                <div style={{display: 'flex'}}>
                    <table>
                        <th>Linje</th>
                        <th>Ändhållplats</th>
                        <th>Om (min)</th>
                        <tbody>
                        {tramDataSolros.Departure.map((dep: any, index: number) => {
                            return (
                                <>
                                    <tr>
                                        <td>
                                            <Board id={uuidv4() + 'solros' + new Date().getTime()}>{setTramNr(dep.Product[0].line, index.toString(), 'solros')}</Board>
                                        </td>
                                        <td style={{paddingRight: 10}}>{setTramEnd(dep.direction)}</td>
                                        <td style={{width: 100}}>{solDepList[index]}</td>
                                    </tr>
                                </>
                            );
                        })}
                        </tbody>
                    </table>
                    <table>
                        <th>Linje</th>
                        <th>Ändhållplats</th>
                        <th>Om (min)</th>
                        <tbody>
                        {tramDataMunk.Departure.map((dep: any, index: number) => {
                            if (dep.Product[0].line !== '5') {
                                return (
                                    <>
                                        <tr>
                                            <td>
                                                <Board id={uuidv4() + 'munk' + new Date().getTime()}>{setTramNr(dep.Product[0].line, index.toString(), 'munk')}</Board>
                                            </td>
                                            <td style={{paddingRight: 10}}>{setTramEnd(dep.direction)}</td>
                                            <td style={{width: 100}}>{munkDepList[index]}</td>
                                        </tr>
                                    </>
                                );
                            }
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </StyledWeather></>
    );
}

const setTramNr = (tramNr: string, id: string, table: string) => {
    let nr = document.getElementById(id + table);
    if (tramNr === '3' && nr) {
        nr.style.backgroundColor = 'blue'
    }
    if (tramNr === 'Buss 3E' && nr) {
        tramNr = '3E'
        nr.style.backgroundColor = 'blue'
    }
    if (tramNr === '5' && nr) {
        nr.style.backgroundColor = 'red'
    }
    if (tramNr === '1' && nr) {
        nr.style.backgroundColor = 'white'
        nr.style.color = 'black'
    }
    if (tramNr === '17' && nr) {
        nr.style.backgroundColor = 'black'
        nr.style.color = '#f5a631'
    }
    return tramNr;
}
const setTramEnd = (name: string): string => {
    let endStation = '';
    switch (name) {
        case 'Virginsgatan (Göteborg kn)':
            endStation = 'Kålltorp'
            break
        case 'Göteborg Axel Dahlströms torg':
            endStation = 'Marklandsgatan'
            break;
        case 'Kålltorp':
            endStation = 'Kålltorp'
            break
        case 'Göteborg Östra sjukhuset':
            endStation = 'Östra Sjukhuset';
            break;
        case 'Göteborg Marklandsgatan':
            endStation = 'Marklandsgatan';
            break;
        case 'Göteborg Varmfrontsgatan':
            endStation = 'Länsmansgården';
            break;
        case 'Hinnebäcksgatan (Göteborg kn)':
            endStation = 'Tuve'
            break;
        case 'Tynnered Opaltorget (Göteborg kn)':
            endStation = 'Tynnered'
            break;
        default:
            endStation = 'Extra insatt'
    }
    return endStation;
}

const Board = styled.div`
  background-color: #ee0e0e;
  border-radius: 5px;
  color: white;
  margin: auto;
  text-align: center;
  width: 30px;
  
`;

const StyledWeather = styled.div`
  border-radius: 10px;
  //display: flex;
  justify-content: flex-start;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 640px;
  height: 330px;
  background-color: rgba(255, 255, 255, 0.35);
  padding: 5px 5px 0 5px;
  margin-top: 20px;
  margin-left: 20px;

  img {
    width: 30px;
    height: 30px;
  }

  h4 {
    margin: 0 0 0 5px;
    padding: 0 0 0 5px;
  }

  h5 {
    margin: 0 0 0 7px;
    font-size: 13px;
  }

  h2 {
    margin: 10px 0 10px 0;
  }

  td {
    border-bottom: 1px solid #050505;
    text-align: left;
    padding: 3px;
    font-weight: bold;
    font-size: 15px;
  }
  
  th {
    text-align: left;
    margin-right: 20px;
    border-bottom: 1px solid black;
  }
  
  table {
    margin: 10px;
    width: 300px;
  }
  p {
    margin: 0 20px 0 0px;
  }
`;