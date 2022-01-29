# NATS Playground

The project is a sandbox created to learn about the [NATS](https://nats.io/).

## nats-box

[nats-box](https://github.com/nats-io/nats-box) provides a lightweight container with NATS and NATS Streaming utilities. Available commands are:

- `nats` - NATS management utility (README).
- `nsc` - create NATS accounts and users.
- `nats-top` - top-like tool for monitoring NATS servers.
- `stan-pub` - publish messages to NATS Streaming.
- `stan-sub` - subscribe to messages from NATS Streaming.
- `stan-bench` - benchmark stan.

The recommended way of using `nats-box` is through docker container.

```shell
docker run --network nats --rm -it synadia/nats-box:latest
```

## Verify NATS works

You can verify that NATS is working correctly by running the following command in terminal `telnet localhost 4222`. 
