export function removeProp(props: any, propName: string[]) {
  const newProps = { ...props };
  try {
    for (const item of propName) {
      delete newProps[item];
    }
  } catch (e) {
    console.error({ e });
  }

  return newProps;
}
