# Infrastructure Automation

## Terraform Configuration (AWS Recommendation)
To achieve optimal resilience and scalability, we recommend the following AWS setup:

### Minimum Configuration for Resilience
- **Multi-AZ Deployment**: Deploy across at least two Availability Zones.
- **Load Balancer (ALB)**: Distributes traffic and performs health checks.
- **Auto Scaling Group (ASG)**: Maintains a minimum of 2 instances and scales based on CPU/Memory usage.
- **RDS Multi-AZ**: Provides a highly available PostgreSQL database with automatic failover.

### Example Terraform Snippet (Conceptual)
```hcl
resource "aws_lb" "app_lb" {
  name               = "portfolio-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb_sg.id]
  subnets            = var.public_subnets
}

resource "aws_autoscaling_group" "app_asg" {
  desired_capacity     = 2
  max_size             = 4
  min_size             = 2
  target_group_arns    = [aws_lb_target_group.app_tg.arn]
  vpc_zone_identifier  = var.private_subnets
  
  launch_template {
    id      = aws_launch_template.app_lt.id
    version = "$Latest"
  }
}
```

## Scaling Strategy
- **Scale Up**: Triggered when average CPU utilization > 70% for 5 minutes.
- **Scale Down**: Triggered when average CPU utilization < 30% for 15 minutes.
