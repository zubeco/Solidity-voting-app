import React, { useState } from "react";
import Layout from "../../../components/Layout";
import { Link } from "../../../routes";
import Voting from "../../../ethereum/voting";
import web3 from "../../../ethereum/web3";
import { Router } from "../../../routes";
import PropagateLoader from "react-spinners/PropagateLoader";

const viewrequests = ({ status, validVotes, address }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  console.log(status);
  console.log(validVotes);

  const finalize = async (id) => {
    setIsLoading(true);
    setErrMsg("");

    const campaigns = Voting(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaigns.methods.finalizedRequest(id).send({
        from: accounts[0],
      });

      Router.pushRoute(`/campaigns/${address}/create`);
    } catch (err) {
      setErrMsg(err.message);
    }
    setIsLoading(false);
  };

  const onApprove = async (id) => {
    setIsLoading(true);
    setErrMsg("");

    const campaigns = Voting(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaigns.methods.voteRequest(id).send({
        from: accounts[0],
      });

      Router.pushRoute(`/campaigns/${address}/create`);
    } catch (err) {
      setErrMsg(err.message);
    }
    setIsLoading(false);
  };

  const stats = () => {
    if (status == 0) {
      return (
        <div className="grid justify-center rounded-2xl">
          <img
            className="w-3 text-center rounded-2xl"
            src="https://image.pngaaa.com/711/1175711-small.png"
            alt="yellow"
          />
        </div>
      );
    } else if (status == 1) {
      return (
        <div className="grid justify-center rounded-2xl">
          <img
            className="w-3 text-center rounded-2xl"
            src="https://image.pngaaa.com/124/744124-small.png"
            alt="green"
          />
        </div>
      );
    } else if (status == 2) {
      return (
        <div className="grid justify-center rounded-2xl">
          <img
            className="w-3 text-center rounded-2xl"
            src="data:image/jpeg;base64,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"
            alt="gray"
          />
        </div>
      );
    } else if (status == 3) {
      return (
        <div className="grid justify-center rounded-2xl">
          <img
            className="w-3 text-center rounded-2xl"
            src="data:image/jpeg;base64,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"
            alt="red"
          />
        </div>
      );
    }
  };

  return (
    <Layout>
      <div className="">
        <div className="flex content-center justify-between">
          <h2 className="py-6 text-2xl font-semibold text-slate-200">
            Voting Requests
          </h2>
          <div className="pt-9">{stats(status)}</div>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Desciption
              </th>
              <th scope="col" className="px-6 py-3">
                Vote Count
              </th>
              <th scope="col" className="px-6 py-3">
                Vote
              </th>
              <th scope="col" className="px-6 py-3">
                Finalize By Admin
              </th>
            </tr>
          </thead>
          {validVotes.map((valids, index) => {
            return (
              <tbody key={index}>
                <tr className="border-b">
                  <td className="px-6 py-4 text-black bg-white">{index}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black bg-white"
                  >
                    {valids.candidate}
                  </th>
                  <td className="px-6 py-4 text-black bg-white">
                    {valids.noOfVoters}
                  </td>

                  <td className="px-6 py-4 text-black bg-white">
                    <button
                      type="submit"
                      onClick={() => onApprove(index)}
                      className="px-5 py-1 text-indigo-500 border border-indigo-500 rounded-full"
                    >
                      Vote
                    </button>
                  </td>
                  <td className="px-6 py-4 text-black bg-white">
                    <button
                      className="px-5 py-1 text-indigo-500 border border-indigo-500 rounded-full"
                      onClick={() => finalize(index)}
                    >
                      Finalize
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      {errMsg ? (
        <div className="block w-full px-2 py-2 mt-5 text-white border rounded-md border-slate-600">
          <p className="text-white-500">Oops!</p>
          <p className="text-red-500">{errMsg}</p>
        </div>
      ) : null}

      <Link route={`/campaigns/${address}/create/createvote`}>
        <a className="grid justify-items-stretch">
          {isLoading ? (
            <div className="grid justify-center mt-4">
              <PropagateLoader
                color={"#6366F1"}
                loading={isLoading}
                size={15}
              />
            </div>
          ) : (
            <button className="px-3 py-3 text-sm font-semibold text-white bg-indigo-500 rounded-md mt-7 justify-items-end">
              Add New Request
            </button>
          )}
        </a>
      </Link>
    </Layout>
  );
};

viewrequests.getInitialProps = async (props) => {
  const { address } = props.query;
  const voting = Voting(props.query.address);
  const campaigns = Voting(address);
  const requestCount = await campaigns.methods.getRequestsCount().call();
  const summary = await voting.methods.getSummary().call();
  console.log({ summary });
  const validVotes = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campaigns.methods.validVotes(index).call();
      })
  );
  return { status: summary[3], validVotes, address };
};

export default viewrequests;
