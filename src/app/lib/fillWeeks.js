import Link from "next/link";

export default function fillWeeks(
  weeksFilled,
  weeks,
  proId,
  userId,
  empId,
  HOSTNAME
) {
  for (const [key, value] of Object.entries(weeks)) {
    weeksFilled.push(
      <li key={key}>
        <Link href={`${HOSTNAME}/${userId}/projects`}> {key}:</Link>{" "}
        {value.map((e, index) => {
          if (index !== value.length - 1) {
            return (
              <Link key={e} href={`${HOSTNAME}/${userId}/projects/${proId}`}>
                {e.slice(0, 10) + ", "}
              </Link>
            );
          }
          return (
            <Link key={e} href={`${HOSTNAME}`}>
              {e.slice(0, 10)}
            </Link>
          );
        })}
      </li>
    );
  }
}
