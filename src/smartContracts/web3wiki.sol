// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract web3wiki {
    string[] public articles;
    mapping(address => uint256[]) public writers_articles;
    mapping(uint256 => mapping(address => uint8)) ownershare; //mapping ownershare articleId to address to share
    mapping(address => string) public profile; // mapping address to username
    mapping(uint256 => address[]) public articleid_to_owners;

    constructor() {
        articles.push("0");
        request memory requestd;
        requestd.owner = msg.sender;
        requestd.articleId = 0;
        requests.push(requestd);
    }

    function createarticle(string memory uri) public {
        articles.push(uri);
        writers_articles[msg.sender].push(articles.length - 1);
        ownershare[articles.length - 1][msg.sender] = 100;
        articleid_to_owners[articles.length - 1].push(msg.sender);
    }

    function updatearticle(uint256 Id, string memory uri) internal {
        articles[Id] = uri;
    }

    function ownershiptransfer(
        uint256 articleId,
        address transfer_to,
        uint8 amount
    ) public {
        //transfering an article ownership
        require((articles.length - 1) >= articleId, "article doesn't exist");
        require(
            ownershare[articleId][msg.sender] >= amount,
            "you not have required share"
        );
        if (ownershare[articleId][transfer_to] == 0) {
            writers_articles[transfer_to].push(articleId);
            articleid_to_owners[articleId].push(transfer_to);
        }
        ownershare[articleId][msg.sender] -= amount;
        ownershare[articleId][transfer_to] += amount;
    }

    struct request {
        //requested changes
        address owner;
        uint256 articleId;
        string uri;
        // address[] acceptedaddress;
        uint8 acceptedamount;
        // mapping(address=>bool) voted;
    }
    mapping(uint256 => mapping(address => bool)) public requestidvoted;
    mapping(address => uint256[]) public addresstorequestIds;
    // request requestd;
    request[] public requests; //requested changes list
    mapping(uint256 => uint256[]) public articles_to_request; // mapping article id to requestids

    function requestchange(uint256 articleId, string memory uri) public {
        require((articles.length - 1) >= articleId, "article doesn't exist");
        if (ownershare[articleId][msg.sender] >= 65) {
            updatearticle(articleId, uri);
        } else {
            request memory requestd;
            requestd.owner = msg.sender;
            requestd.articleId = articleId;
            requestd.uri = uri;
            requestd.acceptedamount = 0;
            requestd.acceptedamount = ownershare[articleId][msg.sender];
            // requestd.acceptedaddress[0]=msg.sender;
            // requestd.voted[msg.sender]=true;
            requestidvoted[requests.length][msg.sender] = true;

            articles_to_request[articleId].push(requests.length);
            addresstorequestIds[msg.sender].push(requests.length);
            requests.push(requestd);
        }
    }

    function voterequest(uint256 requestId) public {
        //upvoting for an update request
        require(requests[requestId].articleId != 0, "request don't exit");
        require(
            ownershare[requests[requestId].articleId][msg.sender] != 0,
            "not a owner"
        );
        require(requestidvoted[requestId][msg.sender] != true, "already voted");
        requests[requestId].acceptedamount += ownershare[
            requests[requestId].articleId
        ][msg.sender];
        requestidvoted[requestId][msg.sender] = true;
        if (requests[requestId].acceptedamount >= 65) {
            updatearticle(
                requests[requestId].articleId,
                requests[requestId].uri
            );
            uint256[] memory requestlist = articles_to_request[
                requests[requestId].articleId
            ];
            for (uint i = 0; requestlist.length > i; i++) {
                if (requestlist[i] == requestId) {
                    articles_to_request[requests[requestId].articleId][
                        i
                    ] = articles_to_request[requests[requestId].articleId][
                        requestlist.length - 1
                    ];
                    articles_to_request[requests[requestId].articleId].pop();
                    break;
                }
            }
        }
    }

    function articleswriten(address ad) public view returns (uint256[] memory) {
        return writers_articles[ad];
    }

    function articleuri(uint256 id) public view returns (string memory) {
        return articles[id];
    }

    function requestdata(
        uint256 requesetId
    ) public view returns (request memory) {
        return requests[requesetId];
    }

    function request_of_articleId(
        uint256 articleid
    ) public view returns (uint256[] memory) {
        return articles_to_request[articleid];
    }

    function getarticles() public view returns (string[] memory) {
        return articles;
    }

    function setprofile(string memory uri) public {
        profile[msg.sender] = uri;
    }

    function getrequestsofaddress(
        address ad
    ) public view returns (uint256[] memory) {
        return addresstorequestIds[ad];
    }

    function ownerofarticle(uint256 id) public view returns (address[] memory) {
        return articleid_to_owners[id];
    }
}
