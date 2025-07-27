## Kubernetes

### Workers
Nodes that run containerized applications. Each worker has kubelet, kube-proxy, and container runtime.

### Pods
Smallest deployable unit in Kubernetes. Contains one or more containers that share storage and network.

### ReplicaSet is the official controller
Usually we don't have direct access to the pods, we interact with controllers.

### Deployments
Manages ReplicaSets and provides declarative updates for pods. Handles rolling updates and rollbacks.

## Kube Probes
- **Startup**: Checks if container has started successfully
- **Readiness**: Determines if pod is ready to receive traffic
- **Liveness**: Checks if container is still running and healthy

## HPA - Horizontal Pod Autoscaler
Automatically scales the number of pods based on CPU/memory usage or custom metrics.

## Load Testing

### Fortio
HTTP load testing tool. Can generate traffic to test application performance and autoscaling behavior.
```sh
# Example load test
fortio load -c 8 -qps 1000 -t 60s http://localhost:3333/health
```

## ConfigMap
Stores non-confidential configuration data in key-value pairs. Used to separate config from application code.

## Secrets
Stores sensitive data like passwords, tokens, and keys. Base64 encoded and can be mounted as volumes or environment variables.

## Lens
Kubernetes IDE that provides a desktop GUI for cluster management. Offers real-time monitoring, resource visualization, and easy navigation through cluster objects.

## Cheatsheet

### Cluster Management
```sh
# Typically needs recreate every time containers stop
kind create cluster --config kind.yaml
kind delete cluster --name <cluster-name>
kind get clusters
```

### Resource Management
```sh
kubectl apply -f namespace.yaml
kubectl apply -f deployments.yaml -n <namespace>
kubectl apply -f service.yaml -n <namespace>
kubectl apply -f hpa.yaml -n <namespace>
```

### Cleanup
```sh
kubectl delete namespace <namespace>
kubectl delete pod <pod-name> -n <namespace>
```

### Inspection
```sh
kubectl describe nodes brevly-k8s-worker # see node config
kubectl describe pod/<pod-name> -n <namespace>
kubectl get pods -n <namespace>
kubectl get services -n <namespace>
kubectl get deployments -n <namespace>
kubectl get hpa -n <namespace>
```

### Debugging
```sh
kubectl logs <pod-name> -n <namespace>
kubectl logs <pod-name> -n <namespace> --follow # stream logs
kubectl port-forward pod/<pod-name> 3333:3333 -n <namespace>
kubectl exec -it <pod-name> -n <namespace> -- /bin/sh # shell into pod
```
