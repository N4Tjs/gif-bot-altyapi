const { options, client } = global;

exports.execute = async () => {
    client.user.setPresence({ activity: { name: options.bot.status }, status: 'dnd' });
};

exports.event = {
    name: "ready"
}