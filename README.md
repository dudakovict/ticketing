# **Ticketing - Microservices & Event-Driven Architecture**
A multi-service, event-based, E-Commerce ticketing application, containerized and orchestrated with Docker & Kubernetes.

## Ingress-NGINX Controller
Apply the ingress controller manifests.
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.4/deploy/static/provider/cloud/deploy.yaml
```
Check out the [documentation](https://kubernetes.github.io/ingress-nginx/deploy/) for other options.

## Kubernetes Secrets
Configure `jwt-secret` and `stripe-secret`.
```
kubectl create secret generic jwt_secret --from-literal=JWT_KEY=YOUR_JWT_KEY
```
```
kubectl create secret generic stripe_secret --from-literal=STRIPE_KEY=YOUR_STRIPE_KEY
```

## Mock Hostname
MacOS / Linux
- Modify `/etc/hosts` to include `127.0.0.1 ticketing.dev`

Windows
- Modify `C:\Windows\System32\Drivers\etc\hosts` to include `127.0.0.1 ticketing.dev`

To get around HTTPS warnings in the browser type `thisisunsafe`.

## Skaffold
Install using [brew](https://brew.sh/).

```bash
$ brew install skaffold
```

Install using [chocolatey](https://chocolatey.org/).

```
$ choco install -y skaffold
```

Check out the [documentation](https://skaffold.dev/docs/install/) for other options.

Navigate to the application root directory and startup Skaffold.

```bash
$ skaffold dev --trigger polling
```

## License
[MIT](LICENSE)