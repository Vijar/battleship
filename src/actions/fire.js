export default function fire (context, payload, done) {
    context.dispatch('FIRE', payload);
};
