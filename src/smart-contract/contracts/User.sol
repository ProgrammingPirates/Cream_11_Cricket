// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

contract User {
    
    struct crickter {
        uint256 playerid;
        string playerType;
        uint256 playerPoints;
        string isCaptain;
        string isVCaptain;
    }
    struct teams {
        crickter[] players;
        uint256 matchPoints;
    }

    struct user {
        address uid;
        mapping(uint256 => teams) createdTeams;
    }
		mapping(uint256 => address[]) private allusers;
    mapping(uint256 => uint256) private totalPool;
		mapping(address => user) public users;

    function createUser(address _uid) public {
        user storage usera = users[_uid];
        usera.uid = _uid;
				allusers[0].push(_uid);
    }

    function stringToUint(string memory s) private returns (uint256 result) {
        bytes memory b = bytes(s);
        uint256 i;
        result = 0;
        for (i = 0; i < b.length; i++) {
            uint256 c = uint256(uint8(b[i]));

            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
    }
		

		function getPoints(uint256 _matchid) public returns (uint[] memory ,address[] memory ){
				 	require (allusers[0].length > 0);
				 	address[] memory temp=allusers[0];
					uint[] memory ans;
					address[] memory ansa;
					for(uint256 i=0; i<= temp.length; i++){
						if(users[allusers[0][i]].createdTeams[_matchid].matchPoints>0){
							uint  _att = ans[i];
      				ans[i] = _att;
							address payable _address = payable(ansa[i]);
      				ansa[i] = _address;
						
						}
					}
    			return (ans,ansa);
		}

		function givePrice(uint256 _matchid) public returns (string memory){
				 	require (allusers[0].length > 0);
				 	address[] memory temp=allusers[0];
					address payable winner;
					uint256 currentpoints=0;
					for(uint256 i=0; i<= temp.length; i++){
						if(users[allusers[0][i]].createdTeams[_matchid].matchPoints>currentpoints){
							winner =payable(allusers[0][i]);
							currentpoints=users[allusers[0][i]].createdTeams[_matchid].matchPoints;
						}
					}
					winner.transfer(totalPool[_matchid]);
		}

    function createTeam(
        address _uid,
        uint256 _matchid,
        string[5][11] memory _players
    ) public payable returns (string memory) {
        user storage usera = users[_uid];
        if (usera.createdTeams[_matchid].players.length == 11) {
            return "team created previously";
        }
        if (_players.length != 11) {
            return "team should have 11 players";
        }
        uint256 battercount = 0;
        uint256 bollercount = 0;
        uint256 allroundercount = 0;
        uint256 keepercount = 0;
        uint256 totalpoints = 0;
        int256 captain = 0;
        int256 vcaptain = 0;
        for (uint256 i = 0; i < _players.length; i++) {
            totalpoints = totalpoints + stringToUint(_players[i][1]);
            if (stringToUint(_players[i][3]) == 1) {
                captain++;
            } else if (stringToUint(_players[i][4]) == 1) {
                vcaptain++;
            }
            if (
                keccak256(bytes(_players[i][0])) == keccak256(bytes("Batter"))
            ) {
                battercount++;
            }
            if (
                keccak256(bytes(_players[i][0])) == keccak256(bytes("Boller"))
            ) {
                bollercount++;
            }
            if (
                keccak256(bytes(_players[i][0])) ==
                keccak256(bytes("AllRounder"))
            ) {
                allroundercount++;
            }
            if (
                keccak256(bytes(_players[i][0])) == keccak256(bytes("Keeper"))
            ) {
                keepercount++;
            } else {
                return "not valid player type";
            }
        }
        if (totalpoints > 100) {
            return "total sum of points should be less than 100";
        }
        if (battercount + allroundercount + keepercount < 4) {
            return
                "atleast 4 batters should be there including keeper and all rounders";
        }
        if (bollercount + allroundercount < 4) {
            return "atleast 4 bollers should be there including all rounders";
        }
        if (captain != 1) {
            return "there should be one captain";
        }
        if (vcaptain != 1) {
            return "there should be one captain";
        }
        if (keepercount < 1) {
            return "there should be atleast one keeper";
        } 
            teams storage tempteam = usera.createdTeams[_matchid];
            for (uint256 i = 0; i < _players.length; i++) {
                tempteam.players.push(
                    crickter({
                        playerType: _players[i][0],
                        playerPoints: stringToUint(_players[i][1]),
                        playerid: stringToUint(_players[i][2]),
                        isCaptain: _players[i][3],
                        isVCaptain: _players[i][4]
                    })
                );
            }
            tempteam.matchPoints = 0;
            totalPool[_matchid] = msg.value + totalPool[_matchid];
            return "successfull";
        
    }
}
