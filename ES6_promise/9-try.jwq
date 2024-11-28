export default function guardrail(mathFunction) {
  // create a array queue
  const queue = [];
  try {
    // execut mathfunction, add result to the end of queue
    const result = mathFunction();
    queue.push(result);
  } catch (error) {
    // if error add personal error a the end of queue
    queue.push(`${error.name}: ${error.message}`);
  } finally {
    // add personal message at the end
    queue.push('Guardrail was processed');
  }

  return queue;
}
