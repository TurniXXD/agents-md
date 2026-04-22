FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_DISABLE_PIP_VERSION_CHECK=1

COPY pyproject.toml ./
COPY uv.lock* ./
COPY requirements*.txt ./

RUN --mount=type=cache,target=/root/.cache/pip \
  if [ -f requirements.txt ]; then \
    pip install -r requirements.txt; \
  else \
    pip install "fastapi>=0.110" "uvicorn[standard]>=0.27"; \
  fi

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
