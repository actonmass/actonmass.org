import React from "react";

type Props = {
  rep: GatsbyTypes.Legislator;
  status: "ok" | "ko";
  size?: string;
};

export default function LegCircle({ rep, status, size }: Props) {
  return (
    <div className={`leg_circ ${size ?? ""}`}>
      <div className="cbox">
        <div className="image-with-check">
          <a href={rep.href} className={`leg_circ_img ${status}`}>
            {rep.square_picture ? (
              <img src={rep.square_picture} alt={`${rep.first_name} ${rep.last_name}`} />
            ) : (
              <img src="/img/person-icon.png" alt={`${rep.first_name} ${rep.last_name}`} />
            )}
          </a>
          {status === "ok" && (
            <img className="leg_circ_check" src="/img/green_check.png" alt="green check" />
          )}
          {status === "ko" && <img className="leg_circ_x" src="/img/red_x.png" alt="red x" />}
        </div>
      </div>
      <p className="fRoboto fLight">
        {rep.first_name} {rep.last_name} ({rep.party})
      </p>
      <h5 className="fRoboto fLight">{rep.hometown}</h5>
    </div>
  );
}
