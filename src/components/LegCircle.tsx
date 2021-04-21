import React from "react";
import { Link } from "gatsby";

type Props = {
  rep: GatsbyTypes.Legislator;
  status: "ok" | "ko";
  size?: string;
  msg?: string;
};

export default function LegCircle({ rep, status, size, msg }: Props) {
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
        {rep.first_name} {rep.last_name} ({rep.party})
      </div>
      {rep.hometown && <h5 className="fRoboto fLight">{rep.hometown}</h5>}
      {msg && <h5 className="fRoboto fLight">{msg}</h5>}
    </div>
  );
}
