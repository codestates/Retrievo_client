import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRouteInvitationMutation } from "../../generated/graphql";
import useParams from "../../hooks/useProjectParam";

export const Invitation: React.FC = () => {
  const [routeInvitationMutation] = useRouteInvitationMutation();
  const history = useHistory();
  const projectId = useParams();
  const keyToken = projectId;
  if (!keyToken) {
    history.push("/not-found");
    return <></>;
  }

  useEffect(() => {
    async function express() {
      if (keyToken === null || keyToken === undefined) return;
      try {
        await routeInvitationMutation({
          variables: { keyToken },
        });
        history.push("/auth/register");
      } catch (err) {
        console.log(err);
      }
    }
    express();
  }, [keyToken, routeInvitationMutation, history]);

  return <p>Redirecting...</p>;
};

export default Invitation;
