import React from "react";
import { Link } from "gatsby";
import { startCase } from "lodash";

type Props = {
  rep: Queries.Legislator;
  status: "ok" | "ko";
  size?: string;
  msg?: string;
  showChamber?: boolean;
};

export default function LegCircle({ rep, status, size, msg, showChamber }: Props) {
  const repLocation = rep.hometown || rep.district?.name;
  return (
    <div className={`leg_circ ${size ?? ""}`}>
      <div className="cbox">
        <div className="image-with-check">
          <Link to={rep.href} className={`leg_circ_img ${status}`}>
            {rep.square_picture ? (
              <img src={rep.square_picture} alt={`${rep.first_name} ${rep.last_name}`} />
            ) : (
              <img src="/img/person-icon.png" alt={`${rep.first_name} ${rep.last_name}`} />
            )}
          </Link>
          {status === "ok" && (
            <img className="leg_circ_check" src="/img/green_check.png" alt="green check" />
          )}
          {status === "ko" && <img className="leg_circ_x" src="/img/red_x.png" alt="red x" />}
        </div>
      </div>
      <div className="fRoboto fLight">
        {rep.first_name} {rep.last_name} {rep.party && `(${rep.party})`}
      </div>
      {repLocation && (
        <h5 className="fRoboto fLight">
          {showChamber && `${startCase(rep.district.chamber)} - `}
          {repLocation}
        </h5>
      )}
      {msg && <h5 className="fRoboto fLight">{msg}</h5>}
    </div>
  );
}
